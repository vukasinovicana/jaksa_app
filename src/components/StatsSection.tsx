import { Box, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaBook,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

// prettier-ignore
const stats = [
  { icon: FaGraduationCap, value: "1500+", label: "zadovoljnih studenata", bgColor: '#0B6623'},
  { icon: FaBriefcase, value: "30+", label: "godina iskustva", bgColor: '#3D7D45' },
  { icon: FaBook, value: "10+", label: "napisanih zbirki", bgColor: '#679267' },
  { icon: FaCheckCircle, value: "88%", label: "prolaznost na ispitu", bgColor: '#87A07F'},
  { icon: FaUsers, value: "max. 7", label: "studenata u grupi", bgColor: '#A9BA9D'},
  { icon: FaLocationDot, value: "centralna", label: "lokacija", bgColor: '#B8C9AE'},
];

function StatsSection() {
  return (
    <SimpleGrid
      columns={[1, 2, 3, 6]}
      gap={0}
      bg="#b89f7c"
      bottom="0"
      width="100vw"
      boxShadow="0px -2px 10px rgba(0, 0, 0, 0.2)"
    >
      {stats.map((item, index) => (
        <Box
          key={index}
          bg={item.bgColor}
          p={6}
          textAlign="center"
          color="white"
        >
          <VStack spacing={2}>
            <item.icon size={40} />
            <Text fontSize="2xl" fontWeight="bold">
              {item.value}
            </Text>
            <Text fontSize="lg">{item.label}</Text>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default StatsSection;
