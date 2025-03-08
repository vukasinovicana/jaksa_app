import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider, Box, Button, VStack, Heading } from "@chakra-ui/react";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Box p={4} bg="blue.500">
        <VStack gap={4}>
          <Heading color="white">React Multi-Page App</Heading>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </VStack>
      </Box>

      <Box p={6}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
