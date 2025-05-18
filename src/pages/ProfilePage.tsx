import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
  Field,
  Fieldset,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { colors } from "../constants";
import NavBar from "../components/Navbar";
import "./css/AuthPage.css";

const ProfilePageSection = () => {
  const profileFields = [
    { label: "Ime", placeholder: "Ana" },
    { label: "Prezime", placeholder: "Vukasinovic" },
    { label: "Email", placeholder: "anav@gmail.com", type: "email" },
    { label: "Broj telefona", placeholder: "06514141", type: "tel" },
    { label: "Korisničko ime", placeholder: "anav123" },
    { label: "Lozinka", placeholder: "••••••", type: "password" },
  ];

  return (
    <Flex className="authSection">
      <Heading className="authHeading">Moj profil</Heading>

      <Box className="authForm">
        {profileFields.map((field, index) => (
          <Fieldset.Root key={index}>
            <Fieldset.Content>
              <Field.Root>
                <InputGroup endElement={<FaPen color={colors.darkBrown} />}>
                  <Input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className="authInput"
                    background={colors.darkCream}
                    _placeholder={{ color: colors.darkBrown }}
                    disabled
                  />
                </InputGroup>
                <Field.Label className="authLabel">{field.label}</Field.Label>
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
    <Box className="authWrapper">
      <NavBar />
      <ProfilePageSection />
    </Box>
  );
}

export default ProfilePage;
