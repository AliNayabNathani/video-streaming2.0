import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, login, loginUser, logout } from "../features/user/userSlice";

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  console.log('User: ', user);
  const handleLogin = async () => {
    try {
      dispatch(loginUser({ email, password }));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (user.roleId === 2 || user.roleId === 4)
      console.log(user.roleId);
    router.push('/Admin/');
  })
  return (
    <VStack h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Stack
        direction={{ base: "column", md: "row" }}
        border={"2px solid black"}
        borderRadius={"5px"}
        bg={"#232323"}
        w={["auto", "80%"]}
        h={["auto", "80%"]}
        p={[5, 20]}
      >
        <VStack
          alignItems={"center"}
          alignSelf={"center"}
          justifyItems={"center"}
          w={"50%"}
        >
          <Image src="/assests/videe0/Logo/videe0 - Logo (250x150).png" />
        </VStack>
        <VStack
          justifyContent={"center"}
          p={{ base: "30", md: "55" }}
          spacing={10}

        >
          <Heading>Sign In</Heading>

          <FormControl isInvalid={emailError} w={["100%", "xs"]}>
            <FormLabel w={"100%"}>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="white"
              w={["100%", "xs"]}
            />
            {emailError && (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={passwordError} w={["100%", "xs"]}>
            <FormLabel w={"100%"}>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              focusBorderColor="white"
              placeholder="Password"
              w={["100%", "xs"]}
            />
            {passwordError && (
              <FormErrorMessage>
                Password must be 8 characters long.
              </FormErrorMessage>
            )}
          </FormControl>
          <HStack
            alignSelf={"flex-start"}
            alignItems={"center"}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Checkbox defaultIsChecked colorScheme="green">
              Remember Me
            </Checkbox>
            <Text fontSize="sm" alignSelf="flex-end">
              Forgot Password?
            </Text>
          </HStack>
          <Button onClick={handleLogin} w={"100%"} mt={[2, 4]} p={[0, 6]} >
            Sign In
          </Button>
          <HStack>
            <Text fontSize="sm" mt={0}>
              You don't have an account?
            </Text>
            <Text color={"#55DF01"} fontWeight={"semibold"}>
              Create Account
            </Text>
          </HStack>
        </VStack>
      </Stack>
    </VStack>
  );
}