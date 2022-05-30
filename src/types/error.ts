export enum AuthError {
	REQUIRED_FIELD = 'Champs requis',
	INCORRECT_EMAIL = "Format d'adresse email incorrecte",
	INCORRECT_PASSWORD = 'Adresse email incorrecte',
	PASSWORD_NOT_MATCH = 'Les mots de passes ne correspondent pas',
}

export const USER_USERNAME_REGEX = /^.{4,20}$/
export const USER_EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const USER_PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/ // 6-20 char, alphanumérique + symbol ex: Ae4eazeaz!

export enum UserRegex {
  USERNAME= '^.{4,20}$',
  EMAIL=	'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',
  PASSWORD='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$' // 6-20 char, alphanumérique + symbol ex: Ae4eazeaz!
}