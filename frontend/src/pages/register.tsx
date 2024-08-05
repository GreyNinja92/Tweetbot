import React from "react";
import { Form, Formik } from "formik";
import { Button, Spacer } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { ErrorMap } from "../utils/ErrorMapping";
import { useMutation } from "urql";
import { registerMutation } from "../graphql/mutations/register";
import { useRouter } from "next/router";

const Register = ({}) => {
  const router = useRouter();
  const [_, register] = useMutation(registerMutation);
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);

          if (response.data?.register.errors) {
            setErrors(ErrorMap(response.data.register.errors));
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
