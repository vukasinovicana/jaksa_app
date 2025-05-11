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
import React from "react";
import { colors } from "../constants";

const ContactForm = () => {
  return (
    <Flex
      width="100%"
      bg={colors.brownNavbar}
      direction={{ base: "column", md: "row" }}
      p={10}
      gap={{ base: 6, md: 0 }} // Adds space ONLY in column layout
    >
      {/* Left - Contact Info */}
      <Box flex="1">
        <Heading
          color="white"
          mb={6}
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        >
          Kontakt
        </Heading>
        <VStack align="start" spacing={4} color="white">
          <Box>
            <Text fontWeight="bold">Imejl adresa:</Text>
            <Link
              href="mailto:jaksa.vuk@gmail.com"
              color="white"
              textDecor="underline"
            >
              jaksa.vuk@gmail.com
            </Link>
          </Box>
          <Box>
            <Text fontWeight="bold">Telefon:</Text>
            <Text>+381 637008595</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Adresa:</Text>
            <Text>Bul. Despota Stefana 45</Text>
          </Box>
        </VStack>
      </Box>

      {/* Right - Form */}
      <Box flex="1">
        <VStack gap={4} align="stretch">
          <Fieldset.Root>
            <Fieldset.Content>
              <HStack gap={4}>
                <Field.Root>
                  <Field.Label mt={-1} fontSize="sm" color={colors.cream}>
                    Ime:
                  </Field.Label>
                  <Input
                    type={"text"}
                    borderColor={colors.cream}
                    bg={colors.cream}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label mt={-1} fontSize="sm" color={colors.cream}>
                    Prezime:
                  </Field.Label>
                  <Input
                    type={"text"}
                    borderColor={colors.cream}
                    bg={colors.cream}
                  />
                </Field.Root>
              </HStack>
              <Field.Root>
                <Field.Label mt={-1} fontSize="sm" color={colors.cream}>
                  Tekst:
                </Field.Label>
                <Textarea
                  variant="outline"
                  bg={colors.cream}
                  borderColor={colors.cream}
                />
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>

          <Button alignSelf="center" bg="#f6e9da" color="#333" px={8}>
            Pošalji
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ContactForm;
