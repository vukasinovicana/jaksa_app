import {
  Box,
  Button,
  CloseButton,
  createListCollection,
  Dialog,
  Flex,
  HStack,
  InputGroup,
  Portal,
  RadioGroup,
  Select,
  Span,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { CustomTimePicker } from "./CustomTimePicker";
import CustomDatePicker from "./CustomDatePicker";
import { fetchAllUsers, fetchUser } from "../api/user";
import { User } from "../types/User";
import { createClassRequest } from "../api/class";
import { toaster, Toaster } from "./ui/toaster";
import { Class } from "../types/Class";

interface DialogWindowProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  classes: Class[];
}

const DialogWindow = ({
  open,
  onOpen,
  onClose,
  selectedDate,
  setSelectedDate,
  classes,
}: DialogWindowProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [duration, setDuration] = useState("1h");
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const userCollection = users
    ? createListCollection({
        items: users
          .filter((user) => user.role === "STUDENT")
          .map((user) => ({
            label: `${user.firstname} ${user.lastname} (${user.username})`,
            value: user.username,
            originalItem: user,
          })),
      })
    : createListCollection({ items: [] });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data_users = await fetchAllUsers();
        setUsers(data_users);
        const data_user = await fetchUser();
        setUser(data_user);
        if (data_user.role === "STUDENT") {
          setSelectedStudent(data_user);
        }
      } catch (error) {
        console.error("Došlo je do greške.", error);
      } finally {
      }
    };

    loadData();
  }, []);

  const handleSendRequest = async () => {
    if (!selectedDate || !hour || !minute) {
      console.error("Datum i vreme su obavezni.");
      return;
    }
    const timeStart = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    const studentId = user?.role === "TEACHER" ? selectedStudent?.id : user?.id;

    if (!studentId) {
      toaster.create({
        title: `Student nije izabran.`,
        type: "error",
        closable: true,
      });
      return;
    }

    // Provera da li je datum prošlosti
    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${timeStart}`);
    if (selectedDateTime < now) {
      toaster.create({
        title: `Izabrano vreme i datum su u prošlosti.`,
        type: "error",
        closable: true,
      });
      return;
    }

    // Izračunavanje kraja novog časa
    const durationMinutes = duration === "1h" ? 60 : 90;
    const selectedEndTime = new Date(
      selectedDateTime.getTime() + durationMinutes * 60 * 1000
    );

    // Provera preklapanja sa postojećim odobrenim časovima
    const conflict = classes?.some((cls) => {
      if (cls.date !== selectedDate || cls.classStatus !== "APPROVED")
        return false;

      const existingStart = new Date(`${cls.date}T${cls.timeStart}`);
      const existingEnd = new Date(
        existingStart.getTime() + (cls.duration === "1h" ? 60 : 90) * 60 * 1000
      );

      // Provera da li se intervali preklapaju
      return selectedDateTime < existingEnd && selectedEndTime > existingStart;
    });

    if (conflict) {
      toaster.create({
        title: `Izabran termin nije slobodan.`,
        type: "error",
        closable: true,
      });
      return;
    }

    try {
      await createClassRequest({
        studentId,
        date: selectedDate, // format "YYYY-MM-DD"
        timeStart, // format "HH:mm"
        duration,
        description,
        requestedByStudent: user?.role === "STUDENT",
      });
      console.log("Request sent successfully");
    } catch (err) {
      console.error("Error creating class request", err);
    } finally {
      setShowDatePicker(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={(open: any) => (open ? onOpen() : onClose())}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <CloseButton
                size="sm"
                onClick={() => {
                  setDescription("");
                  onClose();
                }}
                position="absolute"
                top="8px"
                right="8px"
                _focus={{
                  boxShadow: "none",
                  borderColor: "transparent",
                  outline: "none",
                  userSelect: "none",
                }}
              />
              <Dialog.Header>
                <Dialog.Title>Zakazivanje časa</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Flex gap={6}>
                  {/* Left Column: Date Selection */}
                  <Flex direction="column" flex={1} gap={2}>
                    <Text fontWeight={"bold"} color={"#1E1E1E"}>
                      Datum:
                    </Text>
                    <CustomDatePicker
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      disabled={false}
                    />
                    <Text fontWeight={"bold"} color={"#1E1E1E"} marginTop={3}>
                      Trajanje:
                    </Text>
                    <RadioGroup.Root
                      value={duration}
                      onValueChange={(e: {
                        value: React.SetStateAction<string>;
                      }) => setDuration(e.value)}
                    >
                      <HStack gap="6" marginTop={1}>
                        <RadioGroup.Item value="1h">
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>1h</RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="1.5h">
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>1.5h</RadioGroup.ItemText>
                        </RadioGroup.Item>
                      </HStack>
                    </RadioGroup.Root>

                    {user?.role === "TEACHER" && (
                      <>
                        <Text
                          fontWeight={"bold"}
                          color={"#1E1E1E"}
                          marginTop={3}
                        >
                          Učenik:
                        </Text>
                        <Select.Root
                          collection={userCollection}
                          size="sm"
                          width="250px"
                          onValueChange={(val: { value: string }) => {
                            const found =
                              users?.find(
                                (u) =>
                                  u.username.trim() ===
                                  val.value.toString().trim()
                              ) || null;

                            setSelectedStudent(found);
                          }}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Izaberi učenika" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content zIndex={2000}>
                                {userCollection.items.map((item) => (
                                  <Select.Item key={item.value} item={item}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      </>
                    )}
                  </Flex>

                  {/* Right Column: Time Picker */}
                  <Flex direction="column" flex={1} gap={6}>
                    <CustomTimePicker
                      hour={hour}
                      setHour={setHour}
                      minute={minute}
                      setMinute={setMinute}
                      disabled={false}
                    />
                    <Box position="relative" marginTop={3}>
                      <Textarea
                        value={description}
                        placeholder="Opis časa"
                        maxLength={100}
                        onChange={(e) => {
                          setDescription(e.currentTarget.value.slice(0, 100));
                        }}
                        color="#1E1E1E"
                        border="1px solid"
                        borderColor="#1E1E1E"
                        paddingRight="4rem" // opcionalno, da ne ide tekst ispod brojača
                      />
                      <Span
                        position="absolute"
                        bottom="8px"
                        right="12px"
                        color="fg.muted"
                        textStyle="xs"
                        pointerEvents="none"
                      >
                        {description.length} / {100}
                      </Span>
                    </Box>
                  </Flex>
                </Flex>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  onClick={() => {
                    handleSendRequest();
                    //setShowDatePicker(false);
                    //onClose();
                  }}
                  variant="outline"
                  border="1px solid #1E1E1E"
                >
                  Pošalji zahtev
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Toaster />
    </>
  );
};

export default DialogWindow;
