import React from "react";
import { Form, Formik } from "formik";
import { Button, Spacer } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { ErrorMap } from "../utils/ErrorMapping";
import { AnyVariables, DocumentInput, useMutation } from "urql";
import { useRouter } from "next/router";
import { loginMutation } from "../graphql/mutations/login";

const Login = ({}) => {
  const router = useRouter();
  const [_, login] = useMutation(loginMutation);
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(ErrorMap(response.data.login.errors));
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Spacer mt="1rem" />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
