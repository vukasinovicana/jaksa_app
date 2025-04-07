import {
  Box,
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { colors } from "../constants";
import NavBar from "../components/Navbar";
import { FaPen } from "react-icons/fa";

const ProfilePageSection = () => {
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
      {/* Subheading */}
      <Heading fontSize="3xl" color={colors.darkBrown} mb={6}>
        Moj profil
      </Heading>

      {/* Registration Form */}
      <Box
        bg="transparent"
        borderRadius="md"
        width="100%"
        maxW="400px"
        display="flex"
        flexDirection="column"
        gap={5}
      >
        {/* Each input field */}
        {[
          { label: "Ime", placeholder: "Ana" },
          { label: "Prezime", placeholder: "Vukasinovic" },
          { label: "Email", placeholder: "anav@gmail.com", type: "email" },
          { label: "Broj telefona", placeholder: "06514141", type: "tel" },
          { label: "Korisničko ime", placeholder: "anav123" },
          {
            label: "Lozinka",
            placeholder: "xxx",
            type: "password",
          },
          ,
        ].map((field, index) => (
          <Fieldset.Root key={index}>
            <Fieldset.Content>
              <Field.Root>
                <InputGroup endElement={<FaPen color={colors.darkBrown} />}>
                  <Input
                    type={field?.type || "text"}
                    placeholder={field?.placeholder}
                    _placeholder={{ color: colors.darkBrown }}
                    borderColor={colors.darkBrown}
                    background={colors.darkCream}
                    disabled={true}
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ borderColor: "green.500", boxShadow: "none" }}
                  />
                </InputGroup>
                <Field.Label mt={-1} fontSize="sm" color={colors.darkBrown}>
                  {field.label}
                </Field.Label>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        ))}
      </Box>
    </Flex>
  );
};

function ProfilePage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100vw">
      <NavBar></NavBar>
      <ProfilePageSection></ProfilePageSection>
    </Box>
  );
}

export default ProfilePage;
