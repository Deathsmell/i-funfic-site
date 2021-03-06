import {Action} from "redux";
import {ICredentialAction, ICredentialState, ILoginData, ILoginAction, IRegistrationData} from "./credential.interfaces";
import {
    AUTH_REDIRECT,
    AUTHORISE,
    CHECK_AUTH,
    CLEAR_CREDENTIAL,
    LOGIN,
    LOGOUT,
    REGISTRATION
} from "./credential.costants";

export const login = (user: ILoginData): ILoginAction => ({
    type: LOGIN,
    payload: user
})

export const authorise = (authorised: ICredentialState): ICredentialAction => ({
    type: AUTHORISE,
    payload: authorised
})

export const registration = (newUser: IRegistrationData) => ({
    type: REGISTRATION,
    payload: newUser
})

export const logout = (): Action => ({
    type: LOGOUT
})

export const clearCredential = (): Action => ({
    type: CLEAR_CREDENTIAL,
})

export const checkAuth = (): Action => ({
    type: CHECK_AUTH,
})

export const authRedirect = (): Action => ({
    type: AUTH_REDIRECT,
})