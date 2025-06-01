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
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import { registerApi } from "../api/auth";
import "./css/AuthPage.css";
import {
  emailRule,
  passwordRule,
  phoneRule,
  validateField,
} from "../utils/validation";

const SignupPageSection = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!firstname || !lastname || !username || !password || !email || !phone) {
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
    } catch {
      setErrorMessage("Došlo je do greške, pokušajte ponovo.");
    }
  };

  return (
    <Flex className="authSection">
      <Heading className="authHeading">Registracija</Heading>

      <Box className="authForm">
        {errorMessage && <Text className="authError">{errorMessage}</Text>}

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
                  className={`authInput ${field.error ? "inputError" : ""}`}
                />
                <Field.Label className="authLabel">{field.label}</Field.Label>
                {field.error && (
                  <Text className="inputErrorMessage">{field.error}</Text>
                )}
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        ))}

        <Button className="authButton" onClick={handleRegister}>
          Registruj se
        </Button>
      </Box>

      <Text className="authFooterText">
        Imate nalog?{" "}
        <Link to="/prijava" className="authLink">
          Prijavite se
        </Link>
      </Text>
    </Flex>
  );
};

function SignupPage() {
  return (
    <Box className="authWrapper">
      <NavBar />
      <SignupPageSection />
    </Box>
  );
}

export default SignupPage;
