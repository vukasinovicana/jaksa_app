import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  HStack,
  InputGroup,
  Portal,
  RadioGroup,
  Span,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { CustomTimePicker } from "./CustomTimePicker";
import CustomDatePicker from "./CustomDatePicker";

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
                </Flex>

                {/* Right Column: Time Picker */}
                <Flex direction="column" flex={1} gap={6}>
                  <CustomTimePicker />
                  <InputGroup
                    endElement={
                      <Span color="fg.muted" textStyle="xs">
                        {description.length} / {100}
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
                    />
                  </InputGroup>
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
