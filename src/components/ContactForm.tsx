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
import { useEffect, useState } from "react";
import { fetchUser } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { Toaster, toaster } from "./ui/toaster";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUser();
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setRole(data.role ?? "student");
      } catch (error) {
        console.error("Greška pri učitavanju podataka.", error);
      } finally {
      }
    };
    if (isAuthenticated) {
      loadUser();
    }
  }, []);

  const handleSendClick = () => {
    if (!firstName || !lastName || !message) {
      toaster.create({
        title: `Sva polja su obavezna.`,
        type: "error",
        closable: true,
      });
      return;
    }
    const to = "jaksa.vuk@gmail.com";
    const subject = encodeURIComponent(
      `Poruka od ` + firstName + " " + lastName
    );
    const body = encodeURIComponent(message);

    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

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
      {role !== "TEACHER" && (
        <Box className="contactForm">
          <VStack gap={4} align="stretch">
            <Fieldset.Root>
              <Fieldset.Content>
                <HStack gap={4}>
                  <Field.Root>
                    <Field.Label className="formLabel">Ime:</Field.Label>
                    <Input
                      readOnly={isAuthenticated}
                      type="text"
                      className="formInput"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label className="formLabel">Prezime:</Field.Label>
                    <Input
                      readOnly={isAuthenticated}
                      type="text"
                      className="formInput"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Field.Root>
                </HStack>
                <Field.Root>
                  <Field.Label className="formLabel">Tekst:</Field.Label>
                  <Textarea
                    className="formInput"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>

            <Button className="submitButton" onClick={handleSendClick}>
              Pošalji
            </Button>
          </VStack>
        </Box>
      )}
      <Toaster />
    </Flex>
  );
};

export default ContactForm;
