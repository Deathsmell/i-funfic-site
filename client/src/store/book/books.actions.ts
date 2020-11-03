import {CREATE_BOOK, GET_ALL_BOOKS, GET_AUTHOR_BOOKS, IBookAsyncActions, UPDATE_BOOK} from "./books.types"
import {IBook} from "../../../../interfaces";


export const getAllBooks = (): IBookAsyncActions => ({
    type: GET_ALL_BOOKS,
})

export const getBooksByAuthorId = (id: number): IBookAsyncActions => ({
    type: GET_AUTHOR_BOOKS,
    payload: id
})

export const createBook = (): IBookAsyncActions => ({
    type: CREATE_BOOK
})

export const updateBook = (book: IBook): IBookAsyncActions => ({
    type: UPDATE_BOOK,
    payload: book
})


