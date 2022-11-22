import React from "react";
import * as Styled from "./Form.styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type formInput = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  comfirmPassword: string;
};

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required("Last name is required!"),
  email: Yup.string().email().required("Email is required!"),
  age: Yup.number()
    .typeError("Age must be a number")
    .positive("Age must be greater than zero")
    .required("Age is required"),
  password: Yup.string().min(4, "Password length should be > 4 characters").max(15).required(),
  comfirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInput>({
    resolver: yupResolver(schema),
  });

  const submitForm = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <Styled.Wrapper>
        <Styled.Title>Sign Up</Styled.Title>
        <div className="inputs">
          <Styled.Form onSubmit={submitForm}>
            <Styled.Input type="text" placeholder="First Name..." {...register("firstName")} />
            <p>{errors.firstName?.message}</p>
            <Styled.Input type="text" placeholder="Last Name..." {...register("lastName")} />
            <p>{errors.lastName?.message}</p>
            <Styled.Input type="text" placeholder="Email..." {...register("email")} />
            <p>{errors.email?.message}</p>
            <Styled.Input type="text" placeholder="Age..." {...register("age")} />
            <p>{errors.age?.message}</p>
            <Styled.Input type="password" placeholder="Password..." {...register("password")} />
            <p>{errors.password?.message}</p>
            <Styled.Input
              type="password"
              placeholder="Confirm Password..."
              {...register("comfirmPassword")}
            />
            <p>{errors.comfirmPassword?.message && "Password should match!"}</p>
            <Styled.Submit type="submit" id="sumbit" value="Submit" />
          </Styled.Form>
        </div>
      </Styled.Wrapper>
    </>
  );
};
