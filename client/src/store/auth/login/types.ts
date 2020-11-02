import {Roles} from "../../../../../interfaces";
import {CLEAR_CREDENTIAL} from "../types";

export interface ILoginData {
    username: string,
    password: string,
}

export interface ICredentialState {
    authorised: boolean,
    token?: string,
    roles?: Roles[],
    img?: string,
    id?: number
}

export const LOGIN = "AUTH/LOGIN"
export const AUTHORISE = "AUTH/AUTHORIZE"

export interface IAuthActions  {
    type: typeof AUTHORISE | typeof CLEAR_CREDENTIAL,
    payload: ICredentialState
}
