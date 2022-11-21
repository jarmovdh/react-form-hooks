import React from 'react'
import * as Styled from "./Form.styled"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type formInput = {
	firstName: string,
	lastName: string,
	email: string,
	age: number,
	password: string,
	comfirmPassword: string,
}

const schema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
	age: yup.number().positive().integer().required(),
	password: yup.string().min(4).max(15).required(),
	confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})

export const Form = () => {

	const { register, handleSubmit, formState: {errors}  } = useForm<formInput>({
		resolver: yupResolver(schema)
	});

	const submitForm = handleSubmit((data) => {
		console.log(data)
	})


	return (
		<>
			<div className='form'>
				<div className="title">Sign Up</div>
				<div className="inputs">
					<Styled.Form onSubmit={submitForm}>
						<Styled.Input type="text"  placeholder='First Name...' {...register("firstName")} />
						<p>{errors.firstName?.message}</p>
						<Styled.Input type="text"  placeholder='Last Name...' {...register("lastName")} />
						<p>{errors.lastName?.message}</p>
						<Styled.Input type="text"  placeholder='Email...' {...register("email")} />
						<p>{errors.email?.message}</p>
						<Styled.Input type="text" placeholder='Age...' {...register("age")} />
						<p>{errors.age?.message}</p>
						<Styled.Input type="text" placeholder='Password...' {...register("password")}/>
						<p>{errors.password?.message}</p>
						<Styled.Input type="text" placeholder='Confirm Password...' {...register("password")} />
						<Styled.Input type="submit" id="sumbit"/>
					</Styled.Form>
				</div>
			</div>
		</>
	)
}
