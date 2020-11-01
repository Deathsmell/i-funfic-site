import {createAxios} from "./fetch"
import {RegistrationData} from "../store/auth/types";
import {ILoginData} from "../store/auth/login/types";

export const REGISTRATION_URL = "/auth/registration"
export const LOGIN_URL = "/auth/login"

const axios = createAxios();

export const AuthApi = {
    registration: async (user: RegistrationData) =>  await axios.post(REGISTRATION_URL,user),
    login: async (user: ILoginData) => await axios.post(LOGIN_URL,user)
}