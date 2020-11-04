import {IBook} from "../../../../interfaces";
import {ALL_BOOKS, AUTHOR_BOOKS, CREATE_BOOK, GET_ALL_BOOKS, GET_AUTHOR_BOOKS, UPDATE_BOOK} from "./books.constants"
import {IBookActions, IBookAsyncActions} from "./book.interfaces"

export const setCommonBooks = (books: IBook[]): IBookActions => ({
    type: ALL_BOOKS,
    payload: books,
})

export const setMyBooks = (books: IBook[]): IBookActions => ({
    type: AUTHOR_BOOKS,
    payload: books,
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


