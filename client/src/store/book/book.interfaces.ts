import {IBook} from "../../../../interfaces";
import {
    ADD_AUTHOR_BOOK,
    ADD_BOOK,
    CREATE_AUTHOR_BOOK,
    DELETE_AUTHOR_BOOK,
    GET_ALL_BOOKS,
    GET_AUTHOR_BOOKS,
    SET_ALL_BOOKS,
    SET_AUTHOR_BOOKS,
    UPDATE_AUTHOR_BOOK,
} from "./books.constants";

export interface IBooksActions {
    type: typeof SET_ALL_BOOKS
        | typeof SET_AUTHOR_BOOKS
    books: IBook[],
}

export interface IBookActions {
    type: typeof ADD_AUTHOR_BOOK
        | typeof ADD_BOOK
        | typeof DELETE_AUTHOR_BOOK
        | typeof UPDATE_AUTHOR_BOOK,
    book: IBook,
}

export interface IBookAsyncActions {
    type: typeof GET_ALL_BOOKS
}

export interface IBookAsyncActionsByBook {
    type: typeof CREATE_AUTHOR_BOOK
        | typeof UPDATE_AUTHOR_BOOK
        | typeof DELETE_AUTHOR_BOOK
    book: IBook
}

export interface IBookAsyncActionsById {
    type: typeof GET_AUTHOR_BOOKS
    id: number
}
