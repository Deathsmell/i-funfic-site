import {REGISTRATION} from "./types";
import {IChangeFieldAction, RegistrationData} from "../types";

export const registration = (newUser: RegistrationData): IChangeFieldAction => ({
    type: REGISTRATION,
    payload: newUser
})


