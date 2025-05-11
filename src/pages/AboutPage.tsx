import { Box, Flex, Text } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import { colors, texts } from "../constants";
import slika_sa_djacima from "../assets/slika_sa_djacima.png";
import tata_profilna from "../assets/tata_profilna.jpg";
import { ImageSlider } from "../components/ImageSlider";
import TextBox from "../components/TextBox";
import ContactForm from "../components/ContactForm";

const images = [tata_profilna, slika_sa_djacima];

const AboutPageSection = () => {
  return (
    <Flex
      flex="1"
      bg={colors.cream}
      align={"center"}
      direction={"column"}
      p={8}
      gap={8}
    >
      <ImageSlider imageUrls={images}></ImageSlider>
      <TextBox
        title={texts.about_pg_paragraph_1.title}
        text={texts.about_pg_paragraph_1.text}
      ></TextBox>
      <TextBox
        title={texts.about_pg_paragraph_2.title}
        text={texts.about_pg_paragraph_2.text}
        points={texts.about_pg_paragraph_2.points}
      ></TextBox>
      <TextBox
        title={texts.about_pg_paragraph_3.title}
        text={texts.about_pg_paragraph_3.text}
        points={texts.about_pg_paragraph_3.points}
      ></TextBox>
    </Flex>
  );
};

function AboutPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100vw">
      <NavBar />
      <AboutPageSection />
      <ContactForm></ContactForm>
    </Box>
  );
}

export default AboutPage;
