import {IRouter} from "express"
import {BookController} from "../controllers"
import {
    BOOK_CREATE_URL,
    BOOK_UPDATE_URL,
    BOOKS_BY_USER_ID_URL,
    DELETE_AUTHOR_BOOK_URL, GET_ALL_BOOKS_ORDER_RATING_BY_TAGS_URL,
    GET_ALL_BOOKS_ORDER_RATING_URL,
    GET_BOOK_URL, LIST_BOOKS_BY_TAGS_URL,
    LIST_BOOKS_URL,
} from "../api"
import {ensureAuthenticated} from "../config/passport";
import {GET_TAGS_URL} from "../api";

export const booksRouter = (router: IRouter): void => {
    router.get(LIST_BOOKS_URL, BookController.getAll)
    router.post(LIST_BOOKS_BY_TAGS_URL, BookController.getAllByTags)
    router.get(GET_ALL_BOOKS_ORDER_RATING_URL,BookController.getAllOrderRating)
    router.post(GET_ALL_BOOKS_ORDER_RATING_BY_TAGS_URL,BookController.getAllOrderRatingByTags)
    router.get(GET_BOOK_URL, BookController.getById)
    router.get(BOOKS_BY_USER_ID_URL,ensureAuthenticated, BookController.getByUserId)
    router.post(BOOK_CREATE_URL,ensureAuthenticated, BookController.createBook)
    router.put(BOOK_UPDATE_URL,ensureAuthenticated, BookController.updateBook)
    router.delete(DELETE_AUTHOR_BOOK_URL,ensureAuthenticated, BookController.deleteBook)
    router.get(GET_TAGS_URL,BookController.getTagsCount)
}
