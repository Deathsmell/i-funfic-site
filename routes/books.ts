import {IRouter} from "express"
import {BookController} from "../controllers"
import {
    BOOK_CREATE_URL,
    BOOK_UPDATE_URL,
    BOOKS_BY_USER_ID_URL,
    DELETE_AUTHOR_BOOK_URL,
    GET_BOOK_URL,
    LIST_BOOKS_URL,
} from "../api"
import {ensureAuthenticated} from "../config/passport";

export const booksRouter = (router: IRouter): void => {
    router.get(LIST_BOOKS_URL, BookController.getAll)
    router.get(GET_BOOK_URL, BookController.getById)
    router.get(BOOKS_BY_USER_ID_URL,ensureAuthenticated, BookController.getByUserId)
    router.post(BOOK_CREATE_URL,ensureAuthenticated, BookController.createBook)
    router.post(BOOK_UPDATE_URL,ensureAuthenticated, BookController.updateBook)
    router.delete(DELETE_AUTHOR_BOOK_URL,ensureAuthenticated, BookController.deleteBook)
}
