import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { InferType, object, ref, string } from "yup"
import Button from '../../components/UI/Button'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import { AuthError, USER_PASSWORD_REGEX, USER_USERNAME_REGEX } from '../../types/error'

const signUpSchema = object({
  username: string().matches(USER_USERNAME_REGEX,AuthError.FORMAT_USERNAME).required(),
	email:string().email(AuthError.FORMAT_EMAIL).required(AuthError.REQUIRED_FIELD),
	password:string().matches(USER_PASSWORD_REGEX,AuthError.FORMAT_PASSWORD).required(AuthError.REQUIRED_FIELD),
	confirmPassword:string().oneOf([ref('password')],AuthError.PASSWORD_NOT_MATCH).required(AuthError.REQUIRED_FIELD),
});

type SignUpFormType = InferType<typeof signUpSchema>

export default function SignUp() {
	const navigate = useNavigate()
	const { signUp,signInWithGoogle } = useContext(UserAuthContext)

	const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormType>({
		mode: 'onTouched',
		resolver: yupResolver(signUpSchema)
	})

	const onSubmit = (data:SignUpFormType) =>
		signUp(data.email, data.password)
			.then(() => {
				navigate('/verify')
			})
			.catch((err) => {
				console.log(err)
			})

	const onClick = ()=>{
		signInWithGoogle().then(()=>navigate('/parties'))
	}
	
	return (
			<form  onSubmit={handleSubmit(onSubmit)}>
				<h5 >Inscription</h5>
				<div>
					<label htmlFor="username">
						Nom d'utilisateur
						<input
							type="text"
							{...register('username')}
							placeholder="Nom d'utilisateur"
						/>
						<p>{errors.username?.message}</p>
					</label>
				
				</div>
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
				<div>
					<label htmlFor="passwordConfirm">
						Confirmation du mot de passe
						<input
							type="password"
							{...register('confirmPassword')}
							placeholder="Répéter"
						/>
						<p>{errors.confirmPassword?.message}</p>
					</label>
				</div>
				<Button
					type="submit"
					label="Créer un compte"
				/>
				<Button label="Connexion avec google" onClick={onClick}/>
				<div >
					Vous possédez déjà un compte ? {}
					<Link to="/authentication/sign-in">
						Connectez-vous
					</Link>
				</div>
			</form>
	)
}
