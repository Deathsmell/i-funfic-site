import {Router} from "express"
import {authRouter} from "./auth"
import {userRouter} from "./user"
import {booksRouter} from "./books"

export const configRouter = (router: Router): void => {
    authRouter(router)
    userRouter(router)
    booksRouter(router)
}