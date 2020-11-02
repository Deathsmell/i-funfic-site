export interface IUser {
    id?: number,
    username: string,
    email: string,
    password: string,
    roles?: Roles[],
    blocked?: boolean,
    confirm?: boolean,
    img?: string,
}

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN",
}
