import {IRouter} from "express"
import {LOGIN_URL,REGISTRATION_URL,LOGOUT_URL} from '../api'
import {AuthController} from "../controllers";

export const authRouter = (router: IRouter): void => {
    router.post(LOGIN_URL,AuthController.login)
    router.post(REGISTRATION_URL, AuthController.registration)
    router.post(LOGOUT_URL, AuthController.logout)
}