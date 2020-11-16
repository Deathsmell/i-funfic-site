import {IBook} from "../../../../interfaces";
import {
    ADD_AUTHOR_BOOK,
    ADD_BOOK,
    CREATE_AUTHOR_BOOK,
    DELETE_AUTHOR_BOOK,
    GET_ALL_BOOKS, GET_ALL_BOOKS_BY_RATING,
    GET_AUTHOR_BOOKS,
    SET_ALL_BOOKS,
    SET_AUTHOR_BOOKS,
    UPDATE_AUTHOR_BOOK,
} from "./books.constants";
import {IBookFromDb} from "../../../../interfaces/IBook";

export interface IBooksActions {
    type: typeof SET_ALL_BOOKS
        | typeof SET_AUTHOR_BOOKS
    books: IBookFromDb[],
}

export interface IBookActions {
    type: typeof ADD_AUTHOR_BOOK
        | typeof ADD_BOOK
        | typeof UPDATE_AUTHOR_BOOK,
    book: IBookFromDb,
}

export interface IBookActionsById {
    type: typeof DELETE_AUTHOR_BOOK
    id: number
}

export interface IBookAsyncActions {
    type: typeof GET_ALL_BOOKS | typeof GET_ALL_BOOKS_BY_RATING
    tags?: string[]
}

export interface IBookAsyncActionsByBook {
    type: typeof CREATE_AUTHOR_BOOK
        | typeof UPDATE_AUTHOR_BOOK
    book: IBook
}

export interface IBookAsyncActionsById {
    type: typeof GET_AUTHOR_BOOKS
        | typeof DELETE_AUTHOR_BOOK
    id: number
}
