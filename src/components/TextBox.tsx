import React from "react";
import { Box, List, Text } from "@chakra-ui/react";
import "./css/TextBox.css"; // ✅ Import the CSS file

type Point = {
  label: string;
  content: string;
};

type TextBoxProps = {
  title: string;
  text: string;
  points?: Point[];
};

const TextBox = ({ title, text, points = [] }: TextBoxProps) => {
  return (
    <Box className="textBox">
      <Text className="textBox-title">{title}</Text>
      <Text className="textBox-text">{text}</Text>
      {points.length > 0 && (
        <List.Root className="textBox-list">
          {points.map((item, index) => (
            <List.Item key={index} className="textBox-listItem">
              <b>{item.label}</b> {item.content}
            </List.Item>
          ))}
        </List.Root>
      )}
    </Box>
  );
};

export default TextBox;
