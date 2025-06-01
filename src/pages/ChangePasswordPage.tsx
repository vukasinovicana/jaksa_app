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
import "./css/AuthPage.css";
import { changePassword } from "../api/user";
import { passwordRule, validateField } from "../utils/validation";
import { AxiosError } from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { colors } from "../constants";

type ValidationRule = {
  regex: RegExp;
  message: string;
};

const ChangePasswordPageSection = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showNew1, setShowNew1] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleToggle = (show: boolean, setShow: (msg: boolean) => void) =>
    setShow(!show);

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

  if (saving) {
    return (
      <Flex className="authSection" justify="center" align="center">
        <Spinner size="xl" color={colors.darkBrown} />
      </Flex>
    );
  }

  return (
    <Flex className="authSection">
      <Heading className="authHeading">Promena lozinke</Heading>

      <form
        className="authForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveClick();
        }}
      >
        {errorMessage && <Text className="authError">{errorMessage}</Text>}

        {[
          {
            label: "Stara lozinka",
            value: oldPassword,
            type: showOld ? "text" : "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setOldPassword(e.target.value),
            show: showOld,
            handleToggle: () => handleToggle(showOld, setShowOld),
          },
          {
            label: "Nova lozinka",
            value: newPassword,
            type: showNew ? "text" : "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              setNewPassword(val);
              validateField(val, passwordRule, setNewPasswordError);
            },
            show: showNew,
            handleToggle: () => handleToggle(showNew, setShowNew),
            error: newPasswordError,
          },
          {
            label: "Ponovljena nova lozinka",
            value: newPassword1,
            type: showNew1 ? "text" : "password",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword1(e.target.value),
            show: showNew1,
            handleToggle: () => handleToggle(showNew1, setShowNew1),
          },
        ].map((field, index) => (
          <Fieldset.Root key={index}>
            <Fieldset.Content>
              <Field.Root invalid={!!field.error}>
                <Field.Label className="authLabel">{field.label}</Field.Label>

                <InputGroup
                  endElement={
                    <Button
                      onClick={field.handleToggle}
                      className="password-toggle-button"
                    >
                      {field.show ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  }
                >
                  <Input
                    type={field.type || "text"}
                    value={field.value}
                    onChange={field.onChange}
                    className={`authInput ${field.error ? "inputError" : ""}`}
                  />
                </InputGroup>
                <Field.ErrorText>{field.error}</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>
        ))}

        <Button className="authButton" type="submit" disabled={saving}>
          {saving ? "Čuvanje..." : "Sačuvaj"}
        </Button>
      </form>

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
