import {
  Box,
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  InputGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/Navbar";
import { loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./css/AuthPage.css";
import { colors } from "../constants";
import { AxiosError } from "axios";

const LoginPageSection = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleToggle = () => setShow(!show);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Sva polja su obavezna.");
      return;
    }
    try {
      setLoading(true);
      const token = await loginApi(username, password);
      login(token);
      navigate("/pocetna");
    } catch (err) {
      const error = err as AxiosError;
      const backendMessage = error?.response?.data;
      setErrorMessage(
        typeof backendMessage === "string"
          ? backendMessage
          : "Došlo je do greške, pokušajte ponovo."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Flex className="authSection" justify="center" align="center">
        <Spinner size="xl" color={colors.darkBrown} />
      </Flex>
    );
  }

  return (
    <Flex className="authSection">
      <Heading className="authHeading">Prijava</Heading>

      <form
        className="authForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
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
            type: show ? "text" : "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value),
            key: "password",
          },
        ].map((field, index) => (
          <Fieldset.Root key={index}>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label className="authLabel">{field.label}</Field.Label>
                <InputGroup
                  endElement={
                    field.key == "password" ? (
                      <Button
                        onClick={handleToggle}
                        className="password-toggle-button"
                      >
                        {show ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    ) : null
                  }
                >
                  <Input
                    type={field.type || "text"}
                    value={field.value}
                    onChange={field.onChange}
                    className="authInput"
                  />
                </InputGroup>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        ))}

        <Button className="authButton" type="submit">
          Uloguj se
        </Button>
      </form>

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
