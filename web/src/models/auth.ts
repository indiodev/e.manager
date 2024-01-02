export interface AuthRequest {
	email: string;
	password: string;
}

export interface Token {
	token: string;
	type: string;
}
