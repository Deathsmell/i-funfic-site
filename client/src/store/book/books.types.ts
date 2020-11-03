import {IBook} from "../../../../interfaces";

export const ALL_BOOKS = "BOOK/ALL"
export const GET_ALL_BOOKS = "BOOK/GET_ALL_BOOKS"
export const AUTHOR_BOOKS = "BOOK/AUTHOR_BOOKS"
export const GET_AUTHOR_BOOKS = "BOOK/GET_AUTHOR_BOOKS"
export const CREATE_BOOK = "BOOK/CREATE"
export const UPDATE_BOOK = "BOOK/UPDATE"

export interface IBookActions {
    type: typeof ALL_BOOKS | typeof AUTHOR_BOOKS,
    payload: IBook[],
}

export interface IBookAsyncActions {
    type: typeof GET_ALL_BOOKS | typeof GET_AUTHOR_BOOKS | typeof CREATE_BOOK | typeof UPDATE_BOOK
    payload?: IBook | number
}