import {IBook} from "../../../../interfaces";
import {
    SET_ALL_BOOKS,
    SET_AUTHOR_BOOKS,
    CREATE_BOOK,
    GET_ALL_BOOKS,
    GET_AUTHOR_BOOKS,
    UPDATE_BOOK,
    ADD_AUTHOR_BOOK
} from "./books.constants";

export interface IBookActions {
    type: typeof SET_ALL_BOOKS | typeof SET_AUTHOR_BOOKS | typeof ADD_AUTHOR_BOOK,
    payload: IBook | IBook[],
}

export interface IBookAsyncActions {
    type: typeof GET_ALL_BOOKS | typeof GET_AUTHOR_BOOKS | typeof CREATE_BOOK | typeof UPDATE_BOOK
    payload?: IBook | number
}
