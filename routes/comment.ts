import {IRouter} from "express"
import {CommentController} from "../controllers";
import {ensureAuthenticated} from "../config/passport";
import {CREATE_COMMENT_URL, DELETE_COMMENT_URL, GET_BOOK_COMMENTS_URL} from "../api";

export const commentRouter = (router: IRouter): void => {
    router.post(CREATE_COMMENT_URL, ensureAuthenticated, CommentController.create)
    router.get(GET_BOOK_COMMENTS_URL, ensureAuthenticated, CommentController.getCommentsByBookId)
    router.post(DELETE_COMMENT_URL, ensureAuthenticated, CommentController.deleteComment)
}