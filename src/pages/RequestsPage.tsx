import { Box, Flex, IconButton, Table, Text } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import { colors } from "../constants";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { IoIosCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import { color } from "framer-motion";

const RequestsPageSection = () => {
  //obrisi sa backendom
  const zahtevi = [
    {
      ime: "Maja Nikolic",
      datum: "17.12.2024.",
      vreme: "18:00",
      trajanje: "1.5h",
    },
    {
      ime: "Ana Antic",
      datum: "22.12.2024.",
      vreme: "19:00",
      trajanje: "1.5h",
    },
    {
      ime: "Jana Milic",
      datum: "23.12.2024.",
      vreme: "15:00",
      trajanje: "1.5h",
    },
  ];
  //
  return (
    <Flex
      flex="1"
      bg={colors.cream}
      align={"center"}
      direction={"column"}
      p={8}
      gap={8}
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        mb={8}
        color={colors.darkBrown}
      >
        Zahtevi za časove
      </Text>
      <Table.Root align="center" maxWidth="60%">
        <Table.Header>
          <Table.Row background={colors.cream} textAlign={"center"}>
            <Table.ColumnHeader textAlign={"center"}></Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Ime i prezime
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Datum</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Vreme</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Trajanje
            </Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {zahtevi.map((z, i) => (
            <Table.Row key={i} background={colors.cream}>
              <Table.Cell textAlign={"center"}>{i + 1}.</Table.Cell>
              <Table.Cell textAlign={"center"}>{z.ime}</Table.Cell>
              <Table.Cell textAlign={"center"}>{z.datum}</Table.Cell>
              <Table.Cell textAlign={"center"}>{z.vreme}</Table.Cell>
              <Table.Cell textAlign={"center"}>{z.trajanje}</Table.Cell>
              <Table.Cell textAlign={"center"}>
                <Flex justify="center" gap={3}>
                  <IoIosCheckmarkCircle
                    aria-label="Odobri"
                    size="40px"
                    color="green"
                  />
                  <IoIosCloseCircle
                    aria-label="Odbij"
                    color="red"
                    size="40px"
                  />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

function RequestsPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100vw">
      <NavBar />
      <RequestsPageSection />
    </Box>
  );
}

export default RequestsPage;
