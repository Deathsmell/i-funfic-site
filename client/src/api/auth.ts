import {createAxios} from "./fetch"
import {ILoginData,IRegistrationData} from "../store/credential/credential.interfaces";

export const REGISTRATION_URL = "/credential/registration"
export const LOGIN_URL = "/credential/login"
export const LOGOUT_URL = "/logout"

const axios = createAxios();

export const AuthApi = {
    registration: async (user: IRegistrationData) =>  await axios.post(REGISTRATION_URL,user),
    login: async (user: ILoginData) => await axios.post(LOGIN_URL,user),
    logout: async () => await axios.post("/logout")
}