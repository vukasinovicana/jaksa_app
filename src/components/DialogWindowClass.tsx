import {
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
import { Class } from "../types/Class";

interface DialogWindowClassProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedClass: Class;
}

const DialogWindowClass = ({
  open,
  onOpen,
  onClose,
  selectedClass,
}: DialogWindowClassProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [date, setDate] = useState(selectedClass.date);
  const [hour, setHour] = useState(selectedClass.timeStart.split(":")[0]);
  const [minute, setMinute] = useState(selectedClass.timeStart.split(":")[1]);
  const [duration, setDuration] = useState(selectedClass.duration);
  const [student, setStudent] = useState(selectedClass.student);
  const [description, setDescription] = useState(selectedClass.description);
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const userCollection = users
    ? createListCollection({
        items: users.map((user) => ({
          label: `${user.firstname} ${user.lastname} (${user.username})`,
          value: user.username,
          // you can keep user object here if needed
          originalItem: user,
        })),
      })
    : createListCollection({ items: [] });

  useEffect(() => {
    if (open && selectedClass) {
      setDate(selectedClass.date);
      setHour(selectedClass.timeStart.split(":")[0]);
      setMinute(selectedClass.timeStart.split(":")[1]);
      setDuration(selectedClass.duration);
      setDescription(selectedClass.description);
      setStudent(selectedClass.student); // add this line
      setDisabled(true);
    }
  }, [open, selectedClass]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data_users = await fetchAllUsers();
        setUsers(data_users);
        const data_user = await fetchUser();
        setUser(data_user);
      } catch (error) {
        console.error("Došlo je do greške.", error);
      } finally {
      }
    };

    loadData();
  }, []);

  return (
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
              <Dialog.Title>Detalji časa</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex gap={6}>
                {/* Left Column: Date Selection */}
                <Flex direction="column" flex={1} gap={2}>
                  <Text fontWeight={"bold"} color={"#1E1E1E"}>
                    Datum:
                  </Text>
                  <CustomDatePicker
                    selectedDate={date}
                    setSelectedDate={setDate}
                    disabled={disabled}
                  />
                  <Text fontWeight={"bold"} color={"#1E1E1E"} marginTop={3}>
                    Trajanje:
                  </Text>
                  <RadioGroup.Root
                    value={duration}
                    onValueChange={(val: string) => {
                      const actualValue =
                        typeof val === "object" && val?.value ? val.value : val;
                      setDuration(actualValue);
                    }}
                    disabled={disabled}
                  >
                    <HStack gap="6" marginTop={1}>
                      <RadioGroup.Item value="1">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>1h</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="1.5">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>1.5h</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </HStack>
                  </RadioGroup.Root>

                  {user?.username === "admin" && (
                    <>
                      <Text fontWeight={"bold"} color={"#1E1E1E"} marginTop={3}>
                        Učenik:
                      </Text>
                      <Text color={"#1E1E1E"}>
                        {student.firstname +
                          " " +
                          student.lastname +
                          " ( " +
                          student.username +
                          " )"}
                      </Text>
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
                    disabled={disabled}
                  />
                  <InputGroup
                    endElement={
                      <Span color="fg.muted" textStyle="xs">
                        {description?.length} / {100}
                      </Span>
                    }
                    marginTop={3}
                  >
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
                      disabled={disabled}
                    />
                  </InputGroup>
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                onClick={() => {
                  setShowDatePicker(false);
                  setDisabled(!disabled);
                }}
                variant="outline"
                border="1px solid #1E1E1E"
              >
                Izmeni
              </Button>
              <Button
                onClick={() => {
                  setShowDatePicker(false);
                  onClose();
                }}
                variant="outline"
                border="1px solid #1E1E1E"
              >
                Otkaži
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DialogWindowClass;
