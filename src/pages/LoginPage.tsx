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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const LoginPageSection = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username.length || !password.length) {
      setErrorMessage("Sva polja su obavezna.");
      return;
    }
    try {
      const token = await loginApi(username, password); // Your login API
      login(token); // Save to context + localStorage
      navigate("/pocetna");
    } catch (err) {
      setErrorMessage("Neuspešna prijava. Proverite korisničko ime i lozinku.");
    }
  };

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
        Prijava
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
        {/* Error message shown here */}
        {errorMessage && (
          <Text
            color="red.500"
            mt={2}
            pb={3}
            fontWeight="bold"
            textAlign="center"
          >
            {errorMessage}
          </Text>
        )}

        {/* Each input field */}
        {[
          {
            label: "Korisničko ime",
            value: username,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value),
          },
          {
            label: "Lozinka",
            value: password,
            type: "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value),
          },
        ].map((field, index) => (
          <Fieldset.Root key={index}>
            <Fieldset.Content>
              <Field.Root>
                <Input
                  type={field.type || "text"}
                  value={field.value}
                  onChange={field.onChange}
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
          onClick={handleLogin}
        >
          Uloguj se
        </Button>
      </Box>
      <Text color={colors.darkBrown}>
        Nemate nalog?{" "}
        <Link
          to="/registracija"
          color="blue.300"
          style={{
            textDecoration: "underline",
            color: colors.darkBrown,
            fontWeight: "bold",
          }}
        >
          Registrujte se
        </Link>
      </Text>
    </Flex>
  );
};

function LoginPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100vw">
      <NavBar></NavBar>
      <LoginPageSection></LoginPageSection>
    </Box>
  );
}

export default LoginPage;
