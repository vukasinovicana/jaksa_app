import {
  Box,
  Heading,
  VStack,
  Text,
  Link,
  HStack,
  Fieldset,
  Field,
  Input,
  Button,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import "./css/ContactForm.css";

const ContactForm = () => {
  return (
    <Flex className="contactContainer">
      {/* Left - Contact Info */}
      <Box className="contactInfo">
        <Heading className="contactHeading">Kontakt</Heading>
        <VStack align="start" spacing={4} className="contactDetails">
          <Box>
            <Text className="contactLabel">Imejl adresa:</Text>
            <Link href="mailto:jaksa.vuk@gmail.com" className="contactLink">
              jaksa.vuk@gmail.com
            </Link>
          </Box>
          <Box>
            <Text className="contactLabel">Telefon:</Text>
            <Text className="contactText">+381 637008595</Text>
          </Box>
          <Box>
            <Text className="contactLabel">Adresa:</Text>
            <Text className="contactText">Bul. Despota Stefana 45</Text>
          </Box>
        </VStack>
      </Box>

      {/* Right - Form */}
      <Box className="contactForm">
        <VStack gap={4} align="stretch">
          <Fieldset.Root>
            <Fieldset.Content>
              <HStack gap={4}>
                <Field.Root>
                  <Field.Label className="formLabel">Ime:</Field.Label>
                  <Input type="text" className="formInput" />
                </Field.Root>
                <Field.Root>
                  <Field.Label className="formLabel">Prezime:</Field.Label>
                  <Input type="text" className="formInput" />
                </Field.Root>
              </HStack>
              <Field.Root>
                <Field.Label className="formLabel">Tekst:</Field.Label>
                <Textarea className="formInput" />
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>

          <Button className="submitButton">Pošalji</Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ContactForm;
