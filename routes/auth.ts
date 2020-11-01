import {Router} from "express"
import {LOGIN_URL,REGISTRATION_URL} from '../api'
import {AuthController} from "../controllers";

export const authRouter = (router: Router): void => {
    router.post(LOGIN_URL, AuthController.login)
    router.post(REGISTRATION_URL, AuthController.registration)
}