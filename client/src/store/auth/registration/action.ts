import {ChangeEvent} from "react";
import {RequestAction} from '@redux-requests/core';
import {REGISTRATION} from "./types";
import {CHANGE_FIELD, RegistrationData} from "../types";
import {UserApi} from "../../../api"

export const registration = (newUser: RegistrationData): RequestAction => ({
    type: REGISTRATION,
    request: {
        url: UserApi.CREATE,
        method:"post",
        data: newUser
    },
})

export const change = (event: ChangeEvent<HTMLInputElement>) => ({
    type: CHANGE_FIELD,
    payload: {[event.target.name]: event.target.value}
})
