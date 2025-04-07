import React from "react";
import { Box, Flex, List, Text } from "@chakra-ui/react";
import { colors } from "../constants";

type point = {
  label: string;
  content: string;
};

type TextBoxProps = {
  title: string;
  text: string;
  points?: point[];
};

const TextBox = ({ title, text, points = [] }: TextBoxProps) => {
  return (
    <Box textAlign="left" width="100%">
      <Text
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        fontWeight="bold"
        color={colors.darkBrown}
      >
        {title}
      </Text>
      <Text
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        mt={4}
        color={colors.darkBrown}
      >
        {text}
      </Text>
      {points.length > 0 && (
        <List.Root>
          {points.map((item, index) => (
            <List.Item
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color={colors.darkBrown}
            >
              <b>{item.label}</b>
              {item.content}
            </List.Item>
          ))}
        </List.Root>
      )}
    </Box>
  );
};

export default TextBox;
