import { useUser } from "@auth0/nextjs-auth0/client";
import NextLink from "next/link";
import {
  Button,
  Box,
  Text,
  Heading,
  Container,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Login from "../components/Utilities/Login";

function UserProfile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:{" "}
        {error.message === undefined
          ? "Invalid user credentials. Please contact Seshat support"
          : error.message}
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Header />
        <Container maxW="xl" mt={20}>
          <Box p={5} borderWidth="1px" borderRadius="lg">
            <Heading size="xl">Welcome, {user.name}!</Heading>
            <Text mt={4} fontSize="lg">
              Your Marketer API Key: {user.seshat_API_keys.marketerAPIKey}
            </Text>
            <Text mt={4} fontSize="lg">
              Your Publisher/DApp Developer API Key:{" "}
              {user.seshat_API_keys.publisherAPIKey}
            </Text>
            <Spacer mt={6} />
            <Menu>
              <MenuButton as={Button} colorScheme="blue">
                Account
              </MenuButton>
              <MenuList>
                <MenuItem as={NextLink} href="/api/auth/logout">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Login />
    </>
  );
}

export default UserProfile;
