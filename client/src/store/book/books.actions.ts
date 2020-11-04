import {IBook} from "../../../../interfaces";
import {
    ADD_AUTHOR_BOOK,
    CREATE_BOOK,
    GET_ALL_BOOKS,
    GET_AUTHOR_BOOKS,
    SET_ALL_BOOKS,
    SET_AUTHOR_BOOKS,
    UPDATE_BOOK
} from "./books.constants"
import {IBookActions, IBookAsyncActions} from "./book.interfaces"

export const setCommonBooks = (books: IBook[]): IBookActions => ({
    type: SET_ALL_BOOKS,
    payload: books,
})

export const setMyBooks = (books: IBook[]): IBookActions => ({
    type: SET_AUTHOR_BOOKS,
    payload: books,
})

export const addMyBook = (book: IBook): IBookActions => ({
    type: ADD_AUTHOR_BOOK,
    payload: book
})

export const getAllBooks = (): IBookAsyncActions => ({
    type: GET_ALL_BOOKS,
})

export const getBooksByAuthorId = (id: number): IBookAsyncActions => ({
    type: GET_AUTHOR_BOOKS,
    payload: id
})

export const createBook = (book: IBook): IBookAsyncActions => ({
    type: CREATE_BOOK,
    payload: book
})

export const updateBook = (book: IBook): IBookAsyncActions => ({
    type: UPDATE_BOOK,
    payload: book
})


