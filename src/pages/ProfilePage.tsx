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

const ProfilePageSection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    if (!editedUser) return;
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSaveClick = async () => {
    if (!editedUser) return;

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
    } catch (error) {
      setErrorMessage("Greška prilikom čuvanja promena.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
    { label: "Ime", key: "firstname" },
    { label: "Prezime", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Broj telefona", key: "phone" },
    { label: "Korisničko ime", key: "username" },
    // Password excluded from edit for now
  ] as const;

  return (
    <Flex className="authSection">
      <Heading className="authHeading">Moj profil</Heading>

      <Box className="authForm">
        {errorMessage && <Text className="authError">{errorMessage}</Text>}

        {profileFields.map((field, index) => (
          <fieldset key={index} className="authFieldset">
            <div className="authInputGroup">
              <InputGroup
                endElement={
                  <FaPen
                    color={colors.darkBrown}
                    cursor="pointer"
                    onClick={() => handleEditClick(field.key)}
                  />
                }
              >
                <Input
                  type="text"
                  value={editedUser[field.key]}
                  className="authInput"
                  background={colors.darkCream}
                  _placeholder={{ color: colors.darkBrown }}
                  disabled={editableField !== field.key}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  onBlur={() => setEditableField(null)}
                />
              </InputGroup>
              <label className="authLabel">{field.label}</label>
            </div>
          </fieldset>
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
