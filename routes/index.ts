import {Router} from "express"
import {authRouter} from "./auth"
import {userRouter} from "./user"
import {booksRouter} from "./books"
import {cloudinaryRouter} from "./cloudinary";
import {chapterRouter} from "./chapter";

export const configRouter = (router: Router): void => {
    authRouter(router)
    userRouter(router)
    booksRouter(router)
    cloudinaryRouter(router)
    chapterRouter(router)
}