import {IUser} from "../interfaces";

export interface SuccessAction {
    message: string
}

export interface ErrorAction {
    error: string
}

export interface SuccessCreateUser extends SuccessAction{
    user: IUser
}

export interface ErrorCreateUser extends ErrorAction{}