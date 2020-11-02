import {AUTHORISE, LOGIN, ILoginData, ICredentialState, IAuthActions} from "./types";
import {Action} from "redux";

export interface LoginAction extends Action {
    payload: ILoginData
}

export const login = (user: ILoginData): LoginAction => ({
    type: LOGIN,
    payload: user
})

export const authorise = (authorised: ICredentialState): IAuthActions => ({
    type: AUTHORISE,
    payload: authorised
})