import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../../contexts/UserContext'

type SignUpFormType = {
	email: string
	password: string
	passwordConfirm: string
}

export default function SignUpForm() {
	const navigate = useNavigate()
	const { signUp } = useContext(UserAuthContext)

	const { register, handleSubmit, watch } = useForm<SignUpFormType>({
		mode: 'onTouched',
	})

	const onSubmit = (data: SignUpFormType) => {
		signUp(data.email, data.password)
			.then(() => {
				navigate('/parties/')
			})
			.catch((_err) => {})
	}

	return (
			<form  onSubmit={handleSubmit(onSubmit)}>
				<h5 >Inscription</h5>
				<div>
					<label htmlFor="email">
						Email
						<input
							type="email"
							id="email"
							{...register('email', {
								required: 'Vous devez renseigner un email',
								pattern: { value: EMAIL_REGEX, message: 'Adresse email incorrecte' },
							})}
							placeholder="name@company.com"
							required
						/>
					</label>
				</div>
				<div>
					<label htmlFor="password">
						Mot de passe
						<input
							id="password"
							type="password"
							{...register('password', {
								required: 'Vous devez renseigner un mot de passe',
								maxLength: 30,
								minLength: 6,
							})}
							required
						/>
					</label>
				</div>
				<div>
					<label htmlFor="passwordConfirm">
						Mot de passe
						<input
							id="passwordConfirm"
							type="password"
							{...register('passwordConfirm', {
								required: 'Vous devez renseigner un mot de passe',
								validate: (val: string) => {
									if (watch('password') !== val) {
										return 'Les mots de passe ne sont pas identiques'
									}
									return undefined
								},
							})}
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