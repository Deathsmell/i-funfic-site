export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string,
    roles: string[],
}

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN",
}