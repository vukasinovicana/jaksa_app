import {
  Box,
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { colors } from "../constants";
import NavBar from "../components/Navbar";

const SignUpPageSection = () => {
  return (
    <Flex
      flex="1"
      bg={colors.cream}
      align={"center"}
      direction={"column"}
      p={8}
      gap={8}
      width="100%"
    >
      {/* Main Heading */}
      {/*<Heading fontSize="5xl" fontWeight="bold" color="green.700" mb={2}>
        JAKŠA
      </Heading>*/}

      {/* Subheading */}
      <Heading fontSize="3xl" color={colors.darkBrown} mb={6}>
        Registracija
      </Heading>

      {/* Registration Form */}
      <Box
        bg="transparent"
        borderRadius="md"
        width="100%"
        maxW="400px"
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {/* Each input field */}
        {[
          { label: "Ime" },
          { label: "Prezime" },
          { label: "Korisničko ime" },
          {
            label: "Lozinka",
            type: "password",
          },
          { label: "Email", type: "email" },
          { label: "Broj telefona", type: "tel" },
        ].map((field, index) => (
          <Fieldset.Root key={index}>
            <Fieldset.Content>
              <Field.Root>
                <Input
                  type={field.type || "text"}
                  borderColor={colors.darkBrown}
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{ borderColor: "green.500", boxShadow: "none" }}
                />
                <Field.Label mt={-1} fontSize="sm" color={colors.darkBrown}>
                  {field.label}
                </Field.Label>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        ))}

        {/* Submit Button */}
        <Button
          mt={4}
          bg={colors.brownNavbar}
          color="white"
          _hover={{ bg: "#5C4033" }}
          borderRadius="full"
        >
          Registruj se
        </Button>
      </Box>
    </Flex>
  );
};

function SignupPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100vw">
      <NavBar></NavBar>
      <SignUpPageSection></SignUpPageSection>
    </Box>
  );
}

export default SignupPage;
