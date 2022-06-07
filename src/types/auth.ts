import { InferType, object, ref, string } from 'yup';

export enum AuthError {
	REQUIRED_FIELD = 'Champs requis',
	FORMAT_USERNAME = "Le nom d'utiliateur doit contenir 4 à 15 caractères et commencer par une lettre.",
	FORMAT_EMAIL = "Veuillez entrer une adresse email valide",
	FORMAT_PASSWORD = 'Le mot de passe doit contenir entre 8 et 30 caractères.',
	PASSWORD_NOT_MATCH = 'Les mots de passes ne correspondent pas'
}

export const USER_USERNAME_REGEX = /^[a-zA-Z].{4,15}$/
export const USER_EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
export const USER_PASSWORD_REGEX = /^([a-zA-Z0-9\W]{8,30})$/

export const SignUpValidationSchema = object({
  username: string().matches(USER_USERNAME_REGEX,AuthError.FORMAT_USERNAME).required(),
	email:string().email(AuthError.FORMAT_EMAIL).required(AuthError.REQUIRED_FIELD),
	password:string().matches(USER_PASSWORD_REGEX,AuthError.FORMAT_PASSWORD).required(AuthError.REQUIRED_FIELD),
	confirmPassword:string().oneOf([ref('password')],AuthError.PASSWORD_NOT_MATCH).required(AuthError.REQUIRED_FIELD),
});

export type SignUpFormType = InferType<typeof SignUpValidationSchema>

export const SignInValidationSchema = object({
	email:string().email(AuthError.FORMAT_EMAIL).required(AuthError.REQUIRED_FIELD),
	password:string().matches(USER_PASSWORD_REGEX,AuthError.FORMAT_PASSWORD).required(AuthError.REQUIRED_FIELD),
});

export type SignInFormType = InferType<typeof SignInValidationSchema>
