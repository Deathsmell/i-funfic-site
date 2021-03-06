import {IRouter} from "express"
import {
    LOGIN_URL,
    REGISTRATION_URL,
    LOGOUT_URL,
    CHECK_AUTH_URL,
    CONFIRM_EMAIL_URL,
    FACEBOOK_LOGIN_URL,
    FACEBOOK_LOGIN_CALLBACK_URL
} from '../api'
import {AuthController} from "../controllers";
import {ensureAuthenticated} from "../config/passport";

export const authRouter = (router: IRouter): void => {
    router.post(LOGIN_URL,AuthController.login)
    router.get(FACEBOOK_LOGIN_URL,AuthController.facebookLogin)
    router.get(FACEBOOK_LOGIN_CALLBACK_URL, AuthController.facebookCallback)
    router.post(REGISTRATION_URL, AuthController.registration)
    router.post(LOGOUT_URL, AuthController.logout)
    router.get(CHECK_AUTH_URL, ensureAuthenticated,AuthController.checkSuccess)
    router.get(CONFIRM_EMAIL_URL, AuthController.confirm)
}