import { Box, Flex, Text } from "@chakra-ui/react";
import NavBar from "../components/Navbar";
import { IoIosCloseCircle, IoIosCheckmarkCircle } from "react-icons/io";
import "./css/RequestsPage.css"; // 👈 new CSS

const RequestsPageSection = () => {
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

  return (
    <Flex className="requests-section">
      <Text className="requests-heading">Zahtevi za časove</Text>

      <table className="requests-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Ime i prezime</th>
            <th>Datum</th>
            <th>Vreme</th>
            <th>Trajanje</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {zahtevi.map((z, i) => (
            <tr key={i}>
              <td>{i + 1}.</td>
              <td>{z.ime}</td>
              <td>{z.datum}</td>
              <td>{z.vreme}</td>
              <td>{z.trajanje}</td>
              <td>
                <div className="requests-actions">
                  <IoIosCheckmarkCircle
                    aria-label="Odobri"
                    size="32px"
                    color="green"
                  />
                  <IoIosCloseCircle
                    aria-label="Odbij"
                    size="32px"
                    color="red"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Flex>
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
