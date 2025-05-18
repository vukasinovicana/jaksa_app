import { Box, Flex } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import { colors, texts } from "../constants";
import slika_sa_djacima from "../assets/slika_sa_djacima.png";
import tata_profilna from "../assets/tata_profilna.jpg";
import { ImageSlider } from "../components/ImageSlider";
import TextBox from "../components/TextBox";
import ContactForm from "../components/ContactForm";
import "./css/AboutPage.css"; // 👈 import CSS

const images = [tata_profilna, slika_sa_djacima];

const AboutPageSection = () => {
  return (
    <Flex className="about-section">
      <ImageSlider imageUrls={images} />

      <TextBox
        title={texts.about_pg_paragraph_1.title}
        text={texts.about_pg_paragraph_1.text}
      />

      <TextBox
        title={texts.about_pg_paragraph_2.title}
        text={texts.about_pg_paragraph_2.text}
        points={texts.about_pg_paragraph_2.points}
      />

      <TextBox
        title={texts.about_pg_paragraph_3.title}
        text={texts.about_pg_paragraph_3.text}
        points={texts.about_pg_paragraph_3.points}
      />
    </Flex>
  );
};

function AboutPage() {
  return (
    <Box className="about-wrapper">
      <NavBar />
      <AboutPageSection />
      <ContactForm />
    </Box>
  );
}

export default AboutPage;
