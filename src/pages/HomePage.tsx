import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import StatsSection from "../components/StatsSection";
import slika_sa_djacima from "../assets/slika_sa_djacima.png";
import { colors } from "../constants";

const HomePageSection = () => {
  return (
    <Flex
      flex="1"
      width="100%"
      bg={colors.lightBrown}
      align={"center"}
      justifyContent={"center"}
      direction={{ base: "column", md: "row" }}
      p={8}
      gap={{ base: 6, md: 0 }} // Adds space ONLY in column layout
    >
      <Box textAlign="center" maxW="500px">
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="bold"
          color={colors.darkBrown}
        >
          Naučite matematiku sa lakoćom!
        </Text>
        <Text
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          mt={4}
          color={colors.darkBrown}
        >
          Prijavite se što pre i otkrijte zanimljivi svet brojeva bez muke! Sa
          svojim iskustvom i pedagoškim veštinama sam tu da vas naučim da
          savladate svo potrebno gradivo.
        </Text>
        <Text
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="bold"
          mt={6}
          color={colors.darkBrown}
        >
          Škola matematike JAKŠA
        </Text>
      </Box>{" "}
      <Box
        ml={10}
        border="20px solid"
        borderColor={colors.brownNavbar}
        overflow="hidden"
      >
        <Image
          src={slika_sa_djacima}
          alt="Math School"
          maxWidth="600px" // Won't exceed 1200px width
          width="100%" // Scales down on smaller screens
          height="auto"
          objectFit="cover"
        />
      </Box>
    </Flex>
  );
};

function HomePage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <HomePageSection />
      <StatsSection />
    </Box>
  );
}

export default HomePage;
