export type userId = {
	userId: string
}

export type userCredentials = {
	userEmail: string,
	userPassword: string
}

export interface user extends userId, userCredentials{
	name:string
}