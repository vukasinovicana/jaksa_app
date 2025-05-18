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
import { registerApi } from "../api/auth";

type ValidationRule = {
  regex: RegExp;
  message: string;
};

const SignUpPageSection = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRule: ValidationRule = {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
    message:
      "Lozinka mora imati najmanje 6 karaktera, uključujući veliko i malo slovo i jedan broj.",
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRule: ValidationRule = {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Neispravna email adresa.",
  };

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const phoneRule: ValidationRule = {
    regex: /^[0-9]{6,15}$/,
    message: "Broj mora sadržati 6-15 cifara.",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (
      !firstname.length ||
      !lastname.length ||
      !username.length ||
      !password.length ||
      !email.length ||
      !phone.length
    ) {
      setErrorMessage("Sva polja su obavezna.");
      return;
    }
    validateField(email, emailRule, setEmailError);
    validateField(password, passwordRule, setPasswordError);
    validateField(phone, phoneRule, setPhoneError);

    if (emailError || passwordError || phoneError) {
      setErrorMessage("Ispravite greške u formi.");
      return;
    }

    try {
      setErrorMessage("");
      await registerApi(firstname, lastname, username, password, email, phone);
      navigate("/prijava");
    } catch (err) {
      setErrorMessage("Došlo je do greške, pokušajte ponovo.");
    }
  };

  const validateField = (
    value: string,
    rule: ValidationRule,
    setError: (msg: string) => void
  ) => {
    if (!rule.regex.test(value)) {
      setError(rule.message);
      return;
    }
    setError(""); // No errors
  };

  //------------------------------------frontend-------------------------

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
            label: "Ime *",
            value: firstname,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstname(e.target.value),
          },
          {
            label: "Prezime *",
            value: lastname,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setLastname(e.target.value),
          },
          {
            label: "Korisničko ime *",
            value: username,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value),
          },
          {
            label: "Lozinka *",
            value: password,
            type: "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              setPassword(val);
              validateField(val, passwordRule, setPasswordError);
            },
            error: passwordError,
          },
          {
            label: "Email *",
            value: email,
            type: "email",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              setEmail(val);
              validateField(val, emailRule, setEmailError);
            },
            error: emailError,
          },
          {
            label: "Broj telefona *",
            value: phone,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              setPhone(val);
              validateField(val, phoneRule, setPhoneError);
            },
            error: phoneError,
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
                  _hover={{ borderColor: field.error ? "red.500" : "gray.400" }}
                  _focus={{
                    borderColor: field.error ? "red.500" : "green.500",
                    boxShadow: "none",
                  }}
                />
                <Field.Label mt={-1} fontSize="sm" color={colors.darkBrown}>
                  {field.label}
                </Field.Label>

                {field.error && (
                  <Text color="red.500" fontSize="xs" mt={1}>
                    {field.error}
                  </Text>
                )}
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
          onClick={handleRegister}
        >
          Registruj se
        </Button>
      </Box>
      <Text color={colors.darkBrown}>
        Imate nalog?{" "}
        <Link
          to="/prijava"
          color="blue.300"
          style={{
            textDecoration: "underline",
            color: colors.darkBrown,
            fontWeight: "bold",
          }}
        >
          Prijavite se
        </Link>
      </Text>
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
