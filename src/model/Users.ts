export enum USER_ROLES{
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export interface userId {
	userId: string,
}

export interface userName {
	userName?: string
}

export interface userEmail {
	userEmail: string
}

export interface userTokenData extends userId, userEmail{
	userRole?: string
}
export interface userCredentials extends userId {
	userPassword: string,
}
export interface user extends userId, userCredentials{
	name:string
}
export interface errorMessage {
	status: number,
	message: string
}
