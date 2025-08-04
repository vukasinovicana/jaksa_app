import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import "./css/RequestsPage.css";
import RequestsSection from "../components/RequestsSection";
import RequestsSent from "../components/RequestsSent";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { fetchUser } from "../api/user";
import { colors } from "../constants";

const RequestsPageSection = () => {
  const [user, setUser] = useState<User>();
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUser();
        setUser(data);
        //alert(data.id);
      } catch (error) {
        console.error("Došlo je do greške.", error);
      } finally {
      }
    };

    loadUser();
  }, []);

  return (
    <div className="tabs-container">
      <Text className="requests-heading">Zahtevi za časove</Text>
      <Tabs.Root defaultValue="pristigli">
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            className="tabs-trigger"
            value="poslati"
            _selected={{
              color: "#3D2B1F",
              border: "1px  #3D2B1F",
            }}
          >
            Poslati
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger"
            value="pristigli"
            _selected={{
              color: "#3D2B1F",
              border: "1px solid #3D2B1F",
            }}
          >
            Pristigli
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="poslati">
          {user ? (
            <RequestsSent user={user} />
          ) : (
            <Flex justify="center" align="center">
              <Spinner size="xl" color={colors.darkBrown} />
            </Flex>
          )}
        </Tabs.Content>
        <Tabs.Content value="pristigli">
          {user ? (
            <RequestsSection user={user} />
          ) : (
            <Flex justify="center" align="center">
              <Spinner size="xl" color={colors.darkBrown} />
            </Flex>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

function RequestsPage() {
  return (
    <Box className="requests-wrapper">
      <NavBar />
      <RequestsPageSection />
    </Box>
  );
}

export default RequestsPage;
