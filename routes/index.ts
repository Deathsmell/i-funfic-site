import {Router} from "express"
import {authRouter} from "./auth"
import {userRouter} from "./user"
import {booksRouter} from "./books"
import {cloudinaryRouter} from "./cloudinary";
import {chapterRouter} from "./chapter";
import {adminRouter} from "./admin";
import {commentRouter} from "./comment"
import {likeRouter} from "./like";
import {ratingRouter} from "./rating";
import {thesaurusRouter} from "./thesaurus";

export const configRouter = (router: Router): void => {
    authRouter(router)
    userRouter(router)
    booksRouter(router)
    cloudinaryRouter(router)
    chapterRouter(router)
    adminRouter(router)
    commentRouter(router)
    likeRouter(router)
    ratingRouter(router)
    thesaurusRouter(router)
}