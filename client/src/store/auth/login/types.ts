import {Roles} from "../../../../../interfaces";

export interface ILoginData {
    username: string,
    password: string,
}

export interface IAuthorised {
    authorised: boolean,
    token?: string,
    roles?: Roles[]
}

export const LOGIN = "AUTH/LOGIN"
export const AUTHORISE = "AUTH/AUTHORIZE"

export interface IAuthActions  {
    type: typeof AUTHORISE,
    payload: IAuthorised
}
