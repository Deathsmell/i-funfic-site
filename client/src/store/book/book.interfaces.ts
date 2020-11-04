import {IBook} from "../../../../interfaces";
import {
    ADD_AUTHOR_BOOK,
    CREATE_AUTHOR_BOOK,
    DELETE_AUTHOR_BOOK,
    GET_ALL_BOOKS,
    GET_AUTHOR_BOOKS,
    SET_ALL_BOOKS,
    SET_AUTHOR_BOOKS,
    UPDATE_AUTHOR_BOOK
} from "./books.constants";

export interface IBookActions<T extends IBook | IBook[]> {
    type: typeof SET_ALL_BOOKS
        | typeof SET_AUTHOR_BOOKS
        | typeof ADD_AUTHOR_BOOK
        | typeof DELETE_AUTHOR_BOOK,
    payload:T,
}

export interface IBookAsyncActions<T extends IBook | number | null = null > {
    type: typeof GET_ALL_BOOKS
        | typeof GET_AUTHOR_BOOKS
        | typeof CREATE_AUTHOR_BOOK
        | typeof UPDATE_AUTHOR_BOOK
        | typeof DELETE_AUTHOR_BOOK
    payload: T
}
