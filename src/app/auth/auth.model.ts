export interface AuthModel {
    email: string;
    username: string;
    password: string
}

export interface AuthErrorResponse {
    username?: string[];
    password?: string[];
    non_field_errors?: string[];
}
