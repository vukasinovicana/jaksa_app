import React, { useState } from "react";
import { Menu, Button, Flex, Text, Portal } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";

export function CustomTimePicker() {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <Flex direction="column" maxW="200px" gap={2}>
      <Text fontWeight={"bold"} color={"#1E1E1E"}>
        Vreme:
      </Text>
      <Flex gap={2} alignItems="center">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              bg="#EFE4D7"
              color="#1E1E1E"
              border="1px solid"
              borderColor="#1E1E1E"
            >
              {hour}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content maxH="150px" overflowY="scroll" zIndex={2000}>
                {hours.map((h) => (
                  <Menu.Item key={h} onClick={() => setHour(h)}>
                    {h}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Text fontWeight={"bold"} color={"#1E1E1E"}>
          :
        </Text>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              bg="#EFE4D7"
              color="#1E1E1E"
              border="1px solid"
              borderColor="#1E1E1E"
            >
              {minute}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content maxH="150px" overflowY="scroll" zIndex={2000}>
                {minutes.map((m) => (
                  <Menu.Item key={m} onClick={() => setMinute(m)}>
                    {m}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <FaClock color="#1E1E1E" size={20} style={{ marginLeft: 8 }} />
      </Flex>
    </Flex>
  );
}
