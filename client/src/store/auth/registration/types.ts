import {RegistrationData} from "../types"

export const REGISTRATION = "AUTH/REGISTRATION"

export interface IRegistrationAction {
    type: typeof REGISTRATION,
    payload: RegistrationData
}

