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
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/Navbar";
import { loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import "./css/AuthPage.css";

const LoginPageSection = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Sva polja su obavezna.");
      return;
    }
    try {
      const token = await loginApi(username, password);
      login(token);
      navigate("/pocetna");
    } catch {
      setErrorMessage("Neuspešna prijava. Proverite korisničko ime i lozinku.");
    }
  };

  return (
    <Flex className="authSection">
      <Heading className="authHeading">Prijava</Heading>

      <Box className="authForm">
        {errorMessage && <Text className="authError">{errorMessage}</Text>}

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
                  className="authInput"
                />
                <Field.Label className="authLabel">{field.label}</Field.Label>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        ))}

        <Button className="authButton" onClick={handleLogin}>
          Uloguj se
        </Button>
      </Box>

      <Text className="authFooterText">
        Nemate nalog?{" "}
        <Link to="/registracija" className="authLink">
          Registrujte se
        </Link>
      </Text>
    </Flex>
  );
};

function LoginPage() {
  return (
    <Box className="authWrapper">
      <NavBar />
      <LoginPageSection />
    </Box>
  );
}

export default LoginPage;
