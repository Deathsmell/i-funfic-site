import {ChangeField, RegistrationData} from "../types"

export const REGISTRATION = "AUTH/REGISTRATION"

interface RegistrationRequest {
    type: typeof REGISTRATION,
    payload: RegistrationData
}

export type RegistrationType = RegistrationRequest | ChangeField
