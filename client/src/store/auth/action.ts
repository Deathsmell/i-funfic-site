import {ChangeEvent} from "react";
import {CHANGE_FIELD, CLEAR_FIELD, IChangeFieldAction} from "./types";

export * from "./registration/action"
export * from "./login/action"

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