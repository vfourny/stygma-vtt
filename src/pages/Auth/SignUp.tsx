import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { InferType, object, string } from "yup"
import Button from '../../components/UI/Button'
import { AuthError, UserRegex } from '../../types/error'

const signUpSchema = object({
  username: string().required(),
	email:string().email().required(),
	password:string().required(),
	passwordConfirm:string().required(),
}).required();

type SignUpFormType = InferType<typeof signUpSchema>

export default function SignUpForm() {
	const { register, handleSubmit, getValues, formState: { errors } } = useForm<SignUpFormType>({
		mode: 'onTouched',
		resolver: yupResolver(signUpSchema)
	})

	const onSubmit = handleSubmit(data =>
	console.log(data)
	) 

	return (
			<form  onSubmit={onSubmit}>
				<h5 >Inscription</h5>
				<div>
					{/* <label htmlFor="username">
						Email
						<Input
							type="text"
							{...register('username')}
							placeholder="Nom d'utilisateur"
						/>
						{console.log(errors)}
					</label> */}
					
				
				</div>
				<div>
					<label htmlFor="email">
						Email
						<input
							type="email"
							{...register('email', {
								required: AuthError.REQUIRED_FIELD,
								pattern: { value: new RegExp(UserRegex.EMAIL), message: 'Adresse email incorrecte' },
							})}
							placeholder="Email"
						/>
						{console.log(errors)}
					</label>
					
				
				</div>
				<div>
					<label htmlFor="password">
						Mot de passe
						<input
							type="password"
							{...register('password', {
								required: AuthError.REQUIRED_FIELD,
								maxLength: 30,
								minLength: 6,
							})}
							placeholder="Mot de passe"
							required
						/>
					</label>
				</div>
				<div>
					<label htmlFor="passwordConfirm">
						Confirmation du mot de passe
						<input
							type="password"
							{...register('passwordConfirm', {
								required: AuthError.REQUIRED_FIELD,
								validate: (val: string) => {
									if (getValues('password') !== val) {
										return AuthError.PASSWORD_NOT_MATCH
									}
									return undefined
								},
							})}
							placeholder="Répéter"
							required
						/>
					</label>
				</div>
				<Button
					type="submit"
					label="Créer un compte"
				/>
				<div >
					Vous possédez déjà un compte ? {}
					<Link to="/authentication/sign-in">
						Connectez-vous
					</Link>
				</div>
			</form>
	)
}