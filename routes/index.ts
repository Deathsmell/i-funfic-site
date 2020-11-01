import {Router} from "express"
import {authRouter} from "./auth"
import {userRouter} from "./user"

export const configRouter = (router: Router):void => {
    authRouter(router)
    userRouter(router)
}