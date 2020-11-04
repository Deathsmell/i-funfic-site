import {Roles} from "../../../../interfaces";
import {Action} from "redux";
import {AUTHORISE, CLEAR_CREDENTIAL, REGISTRATION} from "./credential.costants";

export interface ICredentialState {
    authorised: boolean,
    token?: string,
    roles?: Roles[],
    img?: string,
    id?: number,
    username?: string
}

export interface ICredentialAction  {
    type: typeof AUTHORISE | typeof CLEAR_CREDENTIAL,
    payload: ICredentialState
}


export interface ILoginAction extends Action {
    payload: ILoginData
}

export interface IRegistrationData {
    username: string,
    email: string,
    password: string,
}

export interface IRegistrationAction {
    type: typeof REGISTRATION,
    payload: IRegistrationData
}

export interface ILoginData {
    username: string,
    password: string,
}