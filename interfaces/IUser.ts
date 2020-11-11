export interface IUser {
    id?: number,
    username: string,
    email: string,
    password: string,
    roles?: Roles[],
    blocked?: boolean,
    confirm?: boolean,
    image?: string,
}

export interface IUserFromDb extends Required<Omit<IUser, "image" | "roles">>{
    image?: string
    roles?: Roles[],
}

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN",
}
