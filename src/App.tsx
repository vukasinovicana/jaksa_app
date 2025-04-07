import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider, Box, Button, VStack, Heading } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import RequestsPage from "./pages/RequestsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/oMeni" element={<AboutPage />} />
      <Route path="/prijava" element={<LoginPage />} />
      <Route path="/registracija" element={<SignupPage />} />
      <Route path="/mojProfil" element={<ProfilePage />} />
      <Route path="/zahtevi" element={<RequestsPage />} />
    </Routes>
  );
}

export default App;
