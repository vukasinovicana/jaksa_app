import { Box, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import "./css/StatsSection.css";
import { stats } from "../constants";

function StatsSection() {
  return (
    <SimpleGrid columns={[1, 2, 3, 6]} className="statsGrid">
      {stats.map((item, index) => (
        <Box
          key={index}
          className="statBox"
          style={{ backgroundColor: item.bgColor }}
        >
          <VStack spacing={2}>
            <item.icon size={40} />
            <Text className="statValue">{item.value}</Text>
            <Text className="statLabel">{item.label}</Text>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default StatsSection;
