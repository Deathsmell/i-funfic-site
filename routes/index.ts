import {Router} from "express"
import {authRouter} from "./auth"
import {userRouter} from "./user"
import {booksRouter} from "./books"
import {cloudinaryRouter} from "./cloudinary";
import {chapterRouter} from "./chapter";
import {adminRouter} from "./admin";
import {commentRouter} from "./comment"

export const configRouter = (router: Router): void => {
    authRouter(router)
    userRouter(router)
    booksRouter(router)
    cloudinaryRouter(router)
    chapterRouter(router)
    adminRouter(router)
    commentRouter(router)
}