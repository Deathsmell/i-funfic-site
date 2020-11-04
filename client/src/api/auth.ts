import axios from "./fetch"
import {ILoginData,IRegistrationData} from "../store/credential/credential.interfaces";
import {REGISTRATION_URL,LOGIN_URL,LOGOUT_URL} from "@api"

export const AuthApi = {
    registration: async (user: IRegistrationData) =>  await axios.post(REGISTRATION_URL,user),
    login: async (user: ILoginData) => await axios.post(LOGIN_URL,user),
    logout: async () => await axios.post(LOGOUT_URL)
}