import {RegistrationType} from "./types"
import {CHANGE_FIELD, RegistrationData} from "../types";

const initialState: RegistrationData = {
    username: "",
    email: "",
    password: "",
}

export const registrationReducer = (
    state: RegistrationData = initialState,
    action: RegistrationType): RegistrationData => {
    switch (action.type) {
        case CHANGE_FIELD:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export type RegistrationState = ReturnType<typeof registrationReducer>;