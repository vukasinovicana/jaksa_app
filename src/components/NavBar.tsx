import {
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { FaBars, FaPhone, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../constants";

function NavBar() {
  // Control visibility based on screen size
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  return (
    <Flex
      bg={colors.brownNavbar}
      color="white"
      px={isMobile ? 4 : 6} // Reduce padding on mobile
      py={3}
      align="center"
      top={0}
      left={0}
      width="100%"
    >
      <Flex flex={1}>
        <Text fontSize={isMobile ? "xl" : "2xl"} fontWeight="bold">
          JAKŠA
        </Text>
      </Flex>

      <Flex flex={1} justify="center">
        <HStack gap={2}>
          <FaPhone />
          <Text fontWeight="bold" fontSize={isMobile ? "sm" : "lg"}>
            +381 637008595
          </Text>
        </HStack>
      </Flex>

      <Flex flex={1} justify="flex-end">
        {isMobile ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <FaBars size={24} />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    _hover={{ bg: colors.cream }}
                    onClick={() => navigate("/zahtevi")}
                  >
                    Zahtevi
                  </Menu.Item>
                  <Menu.Item
                    _hover={{ bg: colors.cream }}
                    onClick={() => navigate("/raspored")}
                  >
                    Raspored casova
                  </Menu.Item>
                  <Menu.Item
                    _hover={{ bg: colors.cream }}
                    onClick={() => navigate("/")}
                  >
                    Početna
                  </Menu.Item>
                  <Menu.Item
                    _hover={{ bg: colors.cream }}
                    onClick={() => navigate("/oMeni")}
                  >
                    O meni
                  </Menu.Item>
                  <Menu.Item
                    _hover={{ bg: colors.cream }}
                    onClick={() => navigate("/prijava")}
                  >
                    Logovanje
                  </Menu.Item>
                  <Menu.Item
                    _hover={{ bg: colors.cream }}
                    onClick={() => navigate("/registracija")}
                  >
                    Registracija
                  </Menu.Item>
                  <Menu.Item
                    _hover={{ bg: colors.cream }}
                    onClick={() => navigate("/mojProfil")}
                  >
                    Moj profil
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <HStack spacing={10}>
            <Link
              to={"/zahtevi"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Zahtevi
            </Link>
            <Link
              to={"/raspored"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Raspored casova
            </Link>
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              Početna
            </Link>
            <Link
              to={"/oMeni"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              O meni
            </Link>
            <Menu.Root>
              <Menu.Trigger asChild>
                <FaUser size={24} color="white" />
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      _hover={{ bg: colors.cream }}
                      onClick={() => navigate("/prijava")}
                    >
                      Logovanje
                    </Menu.Item>
                    <Menu.Item
                      _hover={{ bg: colors.cream }}
                      onClick={() => navigate("/registracija")}
                    >
                      Registracija
                    </Menu.Item>
                    <Menu.Item
                      _hover={{ bg: colors.cream }}
                      onClick={() => navigate("/mojProfil")}
                    >
                      Moj Profil
                    </Menu.Item>
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
