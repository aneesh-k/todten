export interface IUser {
	displayName: string;
	token: string;
	username: string;
	image?: string;
}

export interface IUserFormValues {
	email: string;
	password: string;
	username?: string;
	displayName?: string;
}
