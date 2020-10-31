export interface RegistrationData {
    username: string,
    email: string,
    password: string,
}

export const CHANGE_FIELD = "AUTH/CHANGE_FIELD"

export interface ChangeField {
    type: typeof CHANGE_FIELD
    payload: object
}
