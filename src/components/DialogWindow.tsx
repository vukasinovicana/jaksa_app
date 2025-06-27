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

interface DialogWindowProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const DialogWindow = ({
  open,
  onOpen,
  onClose,
  selectedDate,
  setSelectedDate,
}: DialogWindowProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
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
                  <RadioGroup.Root defaultValue="1">
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

                  {user?.role === "TEACHER" && (
                    <>
                      <Text fontWeight={"bold"} color={"#1E1E1E"} marginTop={3}>
                        Učenik:
                      </Text>
                      <Select.Root
                        collection={userCollection}
                        size="sm"
                        width="250px"
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
                  setShowDatePicker(false);
                  onClose();
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
  );
};

export default DialogWindow;
