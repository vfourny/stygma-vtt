import { Link, useNavigate } from 'react-router-dom'


type SignUpFormType = {
	email: string
	password: string
	passwordConfirm: string
}

export default function SignUpForm() {
	const navigate = useNavigate()

	const onSubmit = (data: SignUpFormType) => {
		signUp(data.email, data.password)
			.then(() => {
				navigate('/parties/')
			})
			.catch((_err) => {})
	}

	return (
		<div >
			<form onSubmit={handleSubmit(onSubmit)}>
				<h5 >Inscription</h5>
				<div>
					<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
					<label htmlFor="password">
						Mot de passe
						<input
							id="password"
							type="password"
							required
						/>
					</label>
				</div>
				<div>
					<label htmlFor="passwordConfirm" >
						Mot de passe
						<input
							id="passwordConfirm"
							type="password"
							required
						/>
					</label>
				</div>
				<button
					type="submit"
				>
					Créer un compte
				</button>
				<div>
					Vous possédez déjà un compte ? {}
					<Link to="/authentication/sign-in">
						Connectez-vous
					</Link>
				</div>
			</form>
		</div>
	)
}