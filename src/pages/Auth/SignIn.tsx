import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { InferType, object, string } from "yup"
import Button from '../../components/UI/Button'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import { AuthError, USER_PASSWORD_REGEX } from '../../types/error'

const signInSchema = object({
	email:string().email(AuthError.FORMAT_EMAIL).required(AuthError.REQUIRED_FIELD),
	password:string().matches(USER_PASSWORD_REGEX,AuthError.FORMAT_PASSWORD).required(AuthError.REQUIRED_FIELD),
});

type SignInFormType = InferType<typeof signInSchema>

export default function SignIn() {
	const navigate = useNavigate()
	const { signIn } = useContext(UserAuthContext)

	const { register, handleSubmit, formState: { errors } } = useForm<SignInFormType>({
		mode: 'onTouched',
		resolver: yupResolver(signInSchema)
	})

	const onSubmit = (data:SignInFormType) =>
		signIn(data.email, data.password)
			.then(() => {
				navigate('/parties')
			})
			.catch((err) => {
				console.log(err)
			})
	
	return (
			<form  onSubmit={handleSubmit(onSubmit)}>
				<h5 >Inscription</h5>
				<div>
					<label htmlFor="email">
						Email
						<input
							type="email"
							{...register('email')}
							placeholder="Email"
						/>
						<p>{errors.email?.message}</p>
					</label>
					
				
				</div>
				<div>
					<label htmlFor="password">
						Mot de passe
						<input
							type="password"
							{...register('password')}
							placeholder="Mot de passe"
						/>
						<p>{errors.password?.message}</p>
					</label>
				</div>
				<Button
					type="submit"
					label="Connexion"
				/>
				<div >
					Vous n'avez pas encore de compte? {}
					<Link to="/auth/sign-up">
						Créer en un
					</Link>
				</div>
			</form>
	)
}
