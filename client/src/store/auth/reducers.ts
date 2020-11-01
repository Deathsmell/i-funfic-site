import {CHANGE_FIELD, CLEAR_FIELD, IChangeFieldAction, RegistrationData} from "./types";

export * from "./login/reducers"

const initialState: RegistrationData = {
    username: "",
    email: "",
    password: "",
}

export const authFieldsReducer = (
    state: RegistrationData = initialState,
    action: IChangeFieldAction): RegistrationData => {
    switch (action.type) {
        case CHANGE_FIELD:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_FIELD:
            return {
                email: "",
                password: "",
                username: "",
            }
        default:
            return state
    }
}

export type AuthFieldsReducer = ReturnType<typeof authFieldsReducer>;