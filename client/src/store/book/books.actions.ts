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
} from "./books.constants"
import {IBookActions, IBookAsyncActions} from "./book.interfaces"

export const setCommonBooks = (books: IBook[]): IBookActions<IBook[]> => ({
    type: SET_ALL_BOOKS,
    payload: books,
})

export const setMyBooks = (books: IBook[]): IBookActions<IBook[]> => ({
    type: SET_AUTHOR_BOOKS,
    payload: books,
})

export const addMyBook = (book: IBook): IBookActions<IBook> => ({
    type: ADD_AUTHOR_BOOK,
    payload: book
})

export const getAllBooksFetch = (): IBookAsyncActions => ({
    type: GET_ALL_BOOKS,
    payload: null
})

export const getBooksByAuthorIdFetch = (id: number): IBookAsyncActions<number> => ({
    type: GET_AUTHOR_BOOKS,
    payload: id
})

export const createBookFetch = (book: IBook): IBookAsyncActions<IBook> => ({
    type: CREATE_AUTHOR_BOOK,
    payload: book
})

export const updateBookFetch = (book: IBook): IBookAsyncActions<IBook> => ({
    type: UPDATE_AUTHOR_BOOK,
    payload: book
})

export const deleteBookFetch = (id: number): IBookAsyncActions<IBook> => ({
    type: DELETE_AUTHOR_BOOK,
    payload: {id}
})

