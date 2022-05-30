import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../../contexts/UserContext'
import { AuthError, UserRegex } from '../../types/error'

type SignUpFormType = {
	email: string
	password: string
	passwordConfirm: string
}

export default function SignUpForm() {
	const navigate = useNavigate()
	const { signUp } = useContext(UserAuthContext)

	const { register, handleSubmit, getValues, formState: { errors } } = useForm<SignUpFormType>({
		mode: 'onTouched',
	})

	const onSubmit = handleSubmit(data =>
		signUp(data.email, data.password)
			.then(() => {
				console.log(1)
				navigate('/parties/')
			})
			.catch((_err) => console.log(2))
	) 

	return (
			<form  onSubmit={onSubmit}>
				<h5 >Inscription</h5>
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
							required
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
				<button
					type="submit"
				>
					Créer un compte
				</button>
				<div >
					Vous possédez déjà un compte ? {}
					<Link to="/authentication/sign-in">
						Connectez-vous
					</Link>
				</div>
			</form>
	)
}