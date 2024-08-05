"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  layout,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  AddIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
import { useMutation, useQuery } from "urql";
import { userQuery } from "../graphql/queries/me";
import { logoutMutation } from "../graphql/mutations/logout";
import { useRef, useState } from "react";
import { postMutation } from "../graphql/mutations/post";

export function capitalizeFirstLetter(s: String) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export default function WithSubnavigation() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [_, createPost] = useMutation(postMutation);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [tweet, setTweet] = useState("");

  const [{ fetching: logoutFetching }, logout] = useMutation(logoutMutation);
  const [{ data: userData, fetching }] = useQuery({ query: userQuery });
  let loginItems = null;

  if (fetching) {
    // do nothing
  } else if (!userData?.me) {
    loginItems = (
      <Stack
        ml={"auto"}
        mr={"1rem"}
        flex={{ base: 1, md: 0 }}
        justify={"flex-end"}
        direction={"row"}
        spacing={6}
      >
        <NextLink href="/login">
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={500}
            variant={"link"}
            height={"100%"}
          >
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"cyan.400"}
            _hover={{
              bg: "blue.300",
            }}
          >
            Register
          </Button>
        </NextLink>
      </Stack>
    );
  } else {
    loginItems = (
      <Stack ml={"auto"} mr={"0rem"} direction={"row"}>
        <Button onClick={onOpen} ml={"auto"} mr={"1rem"}>
          <AddIcon boxSize={3} />
        </Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody mt={"1rem"}>
              <FormControl>
                <FormLabel>Tweet</FormLabel>
                <Input
                  ref={initialRef}
                  value={tweet}
                  onChange={(event) => setTweet(event.target.value)}
                  placeholder="Your post goes here...."
                />
              </FormControl>
            </ModalBody>
            <ModalFooter mt={"0rem"}>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={async () => {
                  await createPost({
                    userId: userData.me!.id,
                    title: tweet,
                  });
                  onClose();
                }}
              >
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Box ml={"auto"} alignSelf={"center"}>
          Hello,{" "}
          <Text display={"inline"} color={"cyan.400"} fontWeight={"800"}>
            {capitalizeFirstLetter(userData.me.username)}
          </Text>
        </Box>
        <Button
          ml={"1rem"}
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"cyan.400"}
          _hover={{
            bg: "blue.300",
          }}
          onClick={() => {
            logout({});
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Stack>
    );
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            alignSelf={"center"}
          >
            Tweetbot
          </Text>

          {loginItems}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [];
