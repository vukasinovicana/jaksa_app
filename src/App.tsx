import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider, Box, Button, VStack, Heading } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import RequestsPage from "./pages/RequestsPage";
import SchedulePage from "./pages/SchedulePage";
import ProtectedRoute from "./ProtectedRoute";
import ChangePasswordPage from "./pages/ChangePasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/pocetna" element={<HomePage />} />
      <Route path="/oMeni" element={<AboutPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/prijava" element={<LoginPage />} />
      <Route path="/registracija" element={<SignupPage />} />
      <Route
        path="/mojProfil"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/promenaLozinke"
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/zahtevi"
        element={
          <ProtectedRoute>
            <RequestsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/raspored"
        element={
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
