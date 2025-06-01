import {
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  Menu,
  Portal,
  Box,
} from "@chakra-ui/react";
import { FaBars, FaPhone, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./css/NavBar.css"; // Import the CSS file

function NavBar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex className="navbar">
      <Flex flex={1}>
        <Text className="logoText">JAKŠA</Text>
      </Flex>

      <Flex flex={1} justify="center">
        <HStack gap={2}>
          <FaPhone />
          <Text className="phoneText">+381 637008595</Text>
        </HStack>
      </Flex>

      <Flex flex={1} justify="flex-end">
        {isMobile ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <FaBars size={24} cursor="pointer" />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {isAuthenticated && (
                    <>
                      <Menu.Item
                        className="menuItem"
                        onClick={() => navigate("/zahtevi")}
                      >
                        Zahtevi
                      </Menu.Item>
                      <Menu.Item
                        className="menuItem"
                        onClick={() => navigate("/raspored")}
                      >
                        Raspored časova
                      </Menu.Item>
                    </>
                  )}
                  <Menu.Item
                    className="menuItem"
                    onClick={() => navigate("/pocetna")}
                  >
                    Početna
                  </Menu.Item>
                  <Menu.Item
                    className="menuItem"
                    onClick={() => navigate("/oMeni")}
                  >
                    O meni
                  </Menu.Item>
                  {!isAuthenticated && (
                    <>
                      <Menu.Item
                        className="menuItem"
                        onClick={() => navigate("/prijava")}
                      >
                        Logovanje
                      </Menu.Item>
                      <Menu.Item
                        className="menuItem"
                        onClick={() => navigate("/registracija")}
                      >
                        Registracija
                      </Menu.Item>
                    </>
                  )}
                  {isAuthenticated && (
                    <>
                      <Menu.Item
                        className="menuItem"
                        onClick={() => navigate("/mojProfil")}
                      >
                        Moj profil
                      </Menu.Item>
                      <Menu.Item className="menuItem" onClick={handleLogout}>
                        Odjavi se
                      </Menu.Item>
                    </>
                  )}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <HStack gap={25}>
            {isAuthenticated && (
              <>
                <Link to="/zahtevi" className="navLink">
                  Zahtevi
                </Link>
                <Link to="/raspored" className="navLink">
                  <Box textAlign="center" lineHeight="1.2">
                    Raspored
                    <br />
                    časova
                  </Box>
                </Link>
              </>
            )}
            <Link to="/pocetna" className="navLink">
              Početna
            </Link>
            <Link to="/oMeni" className="navLink">
              O meni
            </Link>
            <Menu.Root>
              <Menu.Trigger asChild>
                <FaUser size={24} color="white" cursor="pointer" />
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    {!isAuthenticated && (
                      <>
                        <Menu.Item
                          className="menuItem"
                          onClick={() => navigate("/prijava")}
                        >
                          Logovanje
                        </Menu.Item>
                        <Menu.Item
                          className="menuItem"
                          onClick={() => navigate("/registracija")}
                        >
                          Registracija
                        </Menu.Item>
                      </>
                    )}
                    {isAuthenticated && (
                      <>
                        <Menu.Item
                          className="menuItem"
                          onClick={() => navigate("/mojProfil")}
                        >
                          Moj Profil
                        </Menu.Item>
                        <Menu.Item className="menuItem" onClick={handleLogout}>
                          Odjavi se
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
}

export default NavBar;
