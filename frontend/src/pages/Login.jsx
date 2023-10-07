import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Input, Heading, Button } from "@chakra-ui/react";
import { InputLabel } from "@mantine/core";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const login = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!login.ok) {
      setError(login.statusText);
      return;
    }
    const response = await login.json();
    localStorage.setItem("token", response.access_token);

    navigate("/home");
  }

  return (
    <Flex bg="#1F4172" w="100%" h="100vh" justify="center" align="center">
      <Flex
        direction="column"
        bg="white"
        minH="320px"
        w="350px"
        px="20px"
        py="15px"
        borderRadius={8}
      >
        <Heading mb="15px">Login</Heading>
        <form onSubmit={handleLogin}>
          <Flex direction="column" w="full" rowGap="20px">
            <Box w="full">
              <InputLabel>Email:</InputLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <InputLabel>Password:</InputLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box mx="auto">
              <Button type="submit" colorScheme="blue" isLoading={loading}>
                {/* {loading ? "Loading" : "Login"} */}
                Login
              </Button>
            </Box>
          </Flex>
        </form>
        {error !== "" && <span>Error: {error}</span>}
      </Flex>
    </Flex>
  );
}
