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