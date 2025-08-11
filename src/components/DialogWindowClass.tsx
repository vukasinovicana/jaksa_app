import {
  Box,
  CloseButton,
  Dialog,
  Flex,
  HStack,
  Portal,
  RadioGroup,
  Span,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { CustomTimePicker } from "./CustomTimePicker";
import CustomDatePicker from "./CustomDatePicker";
import { fetchUser } from "../api/user";
import { User } from "../types/User";
import { Class } from "../types/Class";
import DeleteClassDialogButton from "./DeleteClassDialogButton";

interface DialogWindowClassProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedClass: Class;
  onStatusChange: () => void;
}

const DialogWindowClass = ({
  open,
  onOpen,
  onClose,
  selectedClass,
  onStatusChange,
}: DialogWindowClassProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(selectedClass.date);
  const [hour, setHour] = useState(selectedClass.timeStart.split(":")[0]);
  const [minute, setMinute] = useState(selectedClass.timeStart.split(":")[1]);
  const [duration, setDuration] = useState(selectedClass.duration);
  const [description, setDescription] = useState(selectedClass.description);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (open && selectedClass) {
      setDate(selectedClass.date);
      setHour(selectedClass.timeStart.split(":")[0]);
      setMinute(selectedClass.timeStart.split(":")[1]);
      setDuration(selectedClass.duration);
      setDescription(selectedClass.description);
    }
  }, [open, selectedClass]);

  useEffect(() => {
    const loadData = async () => {
      try {
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
                    disabled={true}
                  />
                  <Text fontWeight={"bold"} color={"#1E1E1E"} marginTop={3}>
                    Trajanje:
                  </Text>
                  <RadioGroup.Root
                    value={duration}
                    onValueChange={(val: string) => {
                      setDuration(val);
                    }}
                    disabled={true}
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

                  <>
                    <Text fontWeight={"bold"} color={"#1E1E1E"} marginTop={3}>
                      Učenik:
                    </Text>
                    <Text color={"#1E1E1E"}>
                      {selectedClass.studentFirstName +
                        " " +
                        selectedClass.studentLastName}
                    </Text>
                  </>
                </Flex>

                {/* Right Column: Time Picker */}
                <Flex direction="column" flex={1} gap={6}>
                  <CustomTimePicker
                    hour={hour}
                    setHour={setHour}
                    minute={minute}
                    setMinute={setMinute}
                    disabled={true}
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
                      disabled={true}
                      paddingRight="4rem"
                    />
                    <Span
                      position="absolute"
                      bottom="8px"
                      right="12px"
                      color="fg.muted"
                      textStyle="xs"
                      pointerEvents="none"
                    >
                      {description?.length} / {100}
                    </Span>
                  </Box>
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              {user?.id === selectedClass.studentId && (
                <DeleteClassDialogButton
                  classId={selectedClass.id}
                  onStatusChange={() => {
                    onStatusChange();
                    onClose();
                  }}
                />
              )}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DialogWindowClass;
