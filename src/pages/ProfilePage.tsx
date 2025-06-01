import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { colors } from "../constants";
import NavBar from "../components/Navbar";
import "./css/AuthPage.css";
import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "../api/user";
import { User } from "../types/User";
import { Link } from "react-router-dom";
import { phoneRule, validateField } from "../utils/validation";
import { AxiosError } from "axios";

const ProfilePageSection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [editableField, setEditableField] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUser();
        setUser(data);
        setEditedUser(data); // Copy for local editing
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleEditClick = (field: keyof User) => {
    setEditableField(field);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (field == "phone") {
      validateField(value, phoneRule, setPhoneError);
    }
    if (!editedUser) return;
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSaveClick = async () => {
    if (!editedUser) return;
    if (phoneError) {
      setErrorMessage("Ispravite greške u formi.");
      return;
    }
    setSaving(true);
    try {
      // Send only editable fields you want to update
      await updateUser({
        firstname: editedUser.firstname,
        lastname: editedUser.lastname,
        email: editedUser.email,
        phone: editedUser.phone,
        username: editedUser.username,
      });

      // On success, update user and disable editing
      setUser(editedUser);
      setEditableField(null);
    } catch (err) {
      const error = err as AxiosError;
      const backendMessage = error?.response?.data;
      setErrorMessage(
        typeof backendMessage === "string"
          ? backendMessage
          : "Došlo je do greške, pokušajte ponovo."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading || saving) {
    return (
      <Flex className="authSection" justify="center" align="center">
        <Spinner size="xl" color={colors.darkBrown} />
      </Flex>
    );
  }

  if (!user || !editedUser) {
    return (
      <Flex className="authSection" justify="center" align="center">
        <Heading color={colors.darkBrown}>
          Greška pri učitavanju profila.
        </Heading>
      </Flex>
    );
  }

  const profileFields = [
    { label: "Email", key: "email", error: null },
    { label: "Korisničko ime", key: "username", error: null },
    { label: "Ime", key: "firstname", error: null },
    { label: "Prezime", key: "lastname", error: null },
    { label: "Broj telefona", key: "phone", error: phoneError },
    // Password excluded from edit for now
  ] as const;

  return (
    <Flex className="authSection">
      <Heading className="authHeading">Moj profil</Heading>

      <form
        className="authForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveClick();
        }}
      >
        {errorMessage && <Text className="authError">{errorMessage}</Text>}

        {profileFields.map((field, index) => (
          <fieldset key={index} className="authFieldset">
            <div className="authInputGroup">
              <label className="authLabel">{field.label}</label>
              <InputGroup
                endElement={
                  field.key !== "username" && field.key !== "email" ? (
                    <FaPen
                      color={colors.darkBrown}
                      cursor="pointer"
                      onClick={() => handleEditClick(field.key)}
                    />
                  ) : null
                }
              >
                <Input
                  type="text"
                  value={editedUser[field.key]}
                  className={`authInput ${field.error ? "inputError" : ""}`}
                  background={colors.darkCream}
                  _placeholder={{ color: colors.darkBrown }}
                  disabled={editableField !== field.key}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  onBlur={() => setEditableField(null)}
                />
              </InputGroup>
              {field.error && (
                <p className="inputErrorMessage">{field.error}</p>
              )}
            </div>
          </fieldset>
        ))}
        <Button className="authButton" type="submit" disabled={saving}>
          {saving ? "Čuvanje..." : "Sačuvaj"}
        </Button>
      </form>
      <Text className="authFooterText">
        <Link to="/promenaLozinke" className="authLink">
          Promeni lozinku
        </Link>
      </Text>
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
