import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../../contexts/UserContext'

type SignInFormType = {
	email: string
	password: string
	passwordConfirm: string
}

export default function SignInForm() {
	const navigate = useNavigate()
	const { signIn } = useContext(UserAuthContext)


	const onSubmit = (data: SignInFormType) => {
		signIn(data.email, data.password)
			.then(() => {
				navigate('/parties')
			})
			.catch((_err) => {})
	}

	return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<h5 >Connectez-vous</h5>
				<div>
					<label htmlFor="email" >
						Email
						<input
							type="email"
							id="email"
							placeholder="name@company.com"
							required
						/>
					</label>
				</div>
				<div>
					<label htmlFor="password" >
						Mot de passe
						<input
							id="password"
							type="password"
							required
						/>
					</label>
				</div>
				<div>
					<a >
						Mot de passe oublié ?
					</a>
				</div>
				<button
					type="submit"
				>
					Connexion
				</button>
				<div>
					Pas encore inscrit ? {}
					<Link to="/authentication/sign-up" >
						Créer un compte
					</Link>
				</div>
			</form>
	)
}