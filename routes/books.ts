import {IRouter} from "express"
import {BookController} from "../controllers"
import {BOOK_CREATE_URL, BOOK_UPDATE_URL, BOOKS_BY_USER_ID_URL, LIST_BOOKS_URL} from "../api"



export const booksRouter = (router: IRouter): void => {
    router.get(LIST_BOOKS_URL, BookController.getAll)
    router.get(BOOKS_BY_USER_ID_URL, BookController.getByUserId)
    router.post(BOOK_CREATE_URL, BookController.createBook)
    router.post(BOOK_UPDATE_URL, BookController.updateBook)
}
