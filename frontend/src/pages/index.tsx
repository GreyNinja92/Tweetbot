import { useQuery } from "urql";
import { Container } from "../components/Container";
import { postsQuery } from "../graphql/queries/post";
import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { capitalizeFirstLetter } from "./Navigation";

const Index = () => {
  const [{ data, fetching }] = useQuery({ query: postsQuery });
  return (
    <Container maxW="container.xl" height={"100vh"} p={4}>
      <SimpleGrid columns={3} spacing={6}>
        {data?.posts.map((post, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="lg"
            transition="all 0.3s ease-in-out"
            _hover={{
              bgGradient: "linear(to-r, teal.300, blue.500)",
              boxShadow: "2xl",
              transform: "scale(1.02)",
            }}
          >
            <Box p={5}>
              <VStack spacing={2} align="start">
                <Heading size="lg">{post.title}</Heading>
                <Text color="gray.600" fontSize="sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Text>
                <Badge colorScheme="teal" sx={{ textTransform: "none" }}>
                  {capitalizeFirstLetter(post.user.username)}
                </Badge>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;
