import {Action} from "redux";

export interface IChangeFieldAction extends Action{
    payload: RegistrationData
}

export interface RegistrationData {
    username: string,
    email: string,
    password: string,
}

export const CHANGE_FIELD = "AUTH/CHANGE_FIELD"

export interface ChangeField {
    type: typeof CHANGE_FIELD | typeof CLEAR_FIELD
    payload: RegistrationData
}

export const CLEAR_FIELD = "AUTH/CLEAR_FIELD"

export const LOGOUT = "AUTH/LOGOUT"
export const CLEAR_CREDENTIAL = "AUTH/CLEAR_CREDENTIAL"
