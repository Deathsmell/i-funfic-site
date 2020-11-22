import axiosInstance from "./fetch"
import {ILoginData,IRegistrationData} from "../store/credential/credential.interfaces";
import {REGISTRATION_URL, LOGIN_URL, LOGOUT_URL, CHECK_AUTH_URL, FACEBOOK_LOGIN_URL} from "@api"

export const AuthApi = {
    registration: async (user: IRegistrationData) =>  await axiosInstance.post(REGISTRATION_URL,user),
    login: async (user: ILoginData) => await axiosInstance.post(LOGIN_URL,user),
    facebookLogin: async () => await axiosInstance.post(FACEBOOK_LOGIN_URL),
    logout: async () => await axiosInstance.post(LOGOUT_URL),
    check: async () => await axiosInstance.get(CHECK_AUTH_URL)
}