import {AUTHORISE, LOGIN, ILoginData, IAuthorised, IAuthActions} from "./types";
import {Action} from "redux";

export interface LoginAction extends Action {
    payload: ILoginData
}

export const login = (user: ILoginData): LoginAction => ({
    type: LOGIN,
    payload: user
})

export const authorise = (authorised: IAuthorised): IAuthActions => ({
    type: AUTHORISE,
    payload: authorised
})