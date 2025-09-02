import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import StatsSection from "../components/StatsSection";
import slika_sa_djacima from "../assets/slika_sa_djacima.png";
import { colors } from "../constants";
import "./css/HomePage.css";
import NavBar from "../components/Navbar";

const HomePageSection = () => {
  return (
    <Flex className="home-section">
      <Box className="home-text">
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
      </Box>
      <Box className="home-image-container">
        <Image src={slika_sa_djacima} alt="Math School" />
      </Box>
    </Flex>
  );
};

function HomePage() {
  return (
    <Box className="home-wrapper">
      <NavBar />
      <HomePageSection />
      <StatsSection />
    </Box>
  );
}

export default HomePage;
