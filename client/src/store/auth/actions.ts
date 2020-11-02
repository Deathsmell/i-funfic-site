import {ChangeEvent} from "react";
import {CHANGE_FIELD, CLEAR_FIELD, IChangeFieldAction,LOGOUT} from "./types";
import {Action} from "redux";

export * from "./registration/action"
export * from "./login/actions"

export const change = (event: ChangeEvent<HTMLInputElement>) => ({
    type: CHANGE_FIELD,
    payload: {[event.target.name]: event.target.value}
})

export const clearField = (): IChangeFieldAction => ({
    type: CLEAR_FIELD,
    payload: {
        username: "",
        email: "",
        password: "",
    }
})

export const logout = (): Action => ({
    type: LOGOUT
})