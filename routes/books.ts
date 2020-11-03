import {Router} from "express"
import {BookController} from "../controllers"

const LIST_BOOKS_URL = "/book/all"
const BOOKS_BY_USER_ID_URL = "/book/user"
const BOOK_CREATE_URL = "/book/create"
const BOOK_UPDATE_URL = "/book/update"

export const booksRouter = (router: Router): void => {
    router.get(LIST_BOOKS_URL, BookController.getAll)
    router.get(BOOKS_BY_USER_ID_URL, BookController.getByUserId)
    router.post(BOOK_CREATE_URL, BookController.createBook)
    router.post(BOOK_UPDATE_URL, BookController.updateBook)
}
