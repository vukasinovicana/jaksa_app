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
import "./css/AuthPage.css";
import { changePassword } from "../api/user";
import { passwordRule, validateField } from "../utils/validation";
import { AxiosError } from "axios";

type ValidationRule = {
  regex: RegExp;
  message: string;
};

const ChangePasswordPageSection = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleSaveClick = async () => {
    if (!oldPassword || !newPassword || !newPassword1) {
      setErrorMessage("Sva polja su obavezna.");
      return;
    }
    validateField(newPassword, passwordRule, setNewPasswordError);
    if (newPasswordError) {
      setErrorMessage("Ispravite greške u formi.");
      return;
    }

    if (newPassword != newPassword1) {
      setErrorMessage(
        "Nova lozinka i ponovljena nova lozinka moraju biti iste."
      );
      return;
    }

    setSaving(true);
    try {
      await changePassword({
        currentPassword: oldPassword,
        newPassword: newPassword,
      });
      navigate("/mojProfil");
    } catch (err) {
      const error = err as AxiosError;
      const backendMessage = error?.response?.data;
      setErrorMessage(
        typeof backendMessage === "string"
          ? backendMessage
          : "Greška prilikom čuvanja promena."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Flex className="authSection">
      <Heading className="authHeading">Promena lozinke</Heading>

      <Box className="authForm">
        {errorMessage && <Text className="authError">{errorMessage}</Text>}

        {[
          {
            label: "Stara lozinka",
            value: oldPassword,
            type: "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setOldPassword(e.target.value),
          },
          {
            label: "Nova lozinka",
            value: newPassword,
            type: "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              setNewPassword(val);
              validateField(val, passwordRule, setNewPasswordError);
            },
            error: newPasswordError,
          },
          {
            label: "Ponovljena nova lozinka",
            value: newPassword1,
            type: "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword1(e.target.value),
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

        <Button
          className="authButton"
          onClick={handleSaveClick}
          disabled={saving}
        >
          {saving ? "Čuvanje..." : "Sačuvaj"}
        </Button>
      </Box>

      <Text className="authFooterText">
        <Link to="/mojProfil" className="authLink">
          Povratak na moj profil
        </Link>
      </Text>
    </Flex>
  );
};

function ChangePasswordPage() {
  return (
    <Box className="authWrapper">
      <NavBar />
      <ChangePasswordPageSection />
    </Box>
  );
}

export default ChangePasswordPage;
