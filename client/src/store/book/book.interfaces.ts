import {IBook} from "../../../../interfaces";
import {ALL_BOOKS, AUTHOR_BOOKS, CREATE_BOOK, GET_ALL_BOOKS, GET_AUTHOR_BOOKS, UPDATE_BOOK} from "./books.constants";

export interface IBookActions {
    type: typeof ALL_BOOKS | typeof AUTHOR_BOOKS,
    payload: IBook[],
}

export interface IBookAsyncActions {
    type: typeof GET_ALL_BOOKS | typeof GET_AUTHOR_BOOKS | typeof CREATE_BOOK | typeof UPDATE_BOOK
    payload?: IBook | number
}
