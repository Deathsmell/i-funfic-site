import {IBook} from "../../../../interfaces";
import {
    ADD_AUTHOR_BOOK,
    ADD_BOOK,
    CREATE_AUTHOR_BOOK,
    DELETE_AUTHOR_BOOK,
    GET_ALL_BOOKS,
    GET_AUTHOR_BOOKS,
    SET_ALL_BOOKS,
    SET_AUTHOR_BOOKS, UPDATE_AUTHOR_BOOK,
} from "./books.constants"
import {
    IBookActions,
    IBookAsyncActions,
    IBookAsyncActionsByBook,
    IBookAsyncActionsById,
    IBooksActions
} from "./book.interfaces"

export const setCommonBooks = (books: IBook[]): IBooksActions => ({
    type: SET_ALL_BOOKS,
    books: books,
})

export const setMyBooks = (books: IBook[]): IBooksActions=> ({
    type: SET_AUTHOR_BOOKS,
    books: books,
})

export const addBook = (book: IBook): IBookActions => ({
    type: ADD_BOOK,
    book: book
})

export const addMyBook = (book: IBook): IBookActions => ({
    type: ADD_AUTHOR_BOOK,
    book: book
})

export const getAllBooksFetch = (): IBookAsyncActions => ({
    type: GET_ALL_BOOKS,
})

export const getBooksByAuthorIdFetch = (id: number): IBookAsyncActionsById => ({
    type: GET_AUTHOR_BOOKS,
    id: id
})

export const createBookFetch = (book: IBook): IBookAsyncActionsByBook => ({
    type: CREATE_AUTHOR_BOOK,
    book: book
})

export const updateBookFetch = (book: IBook): IBookAsyncActionsByBook => ({
    type: UPDATE_AUTHOR_BOOK,
    book: book
})

export const updateBook = (book: IBook) : IBookActions => ({
    type: UPDATE_AUTHOR_BOOK,
    book: book
})

export const deleteBookFetch = (id: number): IBookAsyncActionsById => ({
    type: DELETE_AUTHOR_BOOK,
    id: id
})

