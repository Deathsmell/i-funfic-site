import {IBook} from "../../../../interfaces";
import {
    ADD_AUTHOR_BOOK,
    ADD_BOOK,
    CREATE_AUTHOR_BOOK,
    DELETE_AUTHOR_BOOK,
    GET_ALL_BOOKS, GET_ALL_BOOKS_BY_RATING,
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
import {IBookFromDb} from "../../../../interfaces/IBook";

export const setCommonBooks = (books: IBookFromDb[]): IBooksActions => ({
    type: SET_ALL_BOOKS,
    books: books,
})

export const setMyBooks = (books: IBookFromDb[]): IBooksActions=> ({
    type: SET_AUTHOR_BOOKS,
    books: books,
})

export const addBook = (book: IBookFromDb): IBookActions => ({
    type: ADD_BOOK,
    book: book
})

export const addMyBook = (book: IBookFromDb): IBookActions => ({
    type: ADD_AUTHOR_BOOK,
    book: book
})

export const getAllBooksByUpdating = (tags?: string[]): IBookAsyncActions => ({
    type: GET_ALL_BOOKS,
    tags: tags
})

export const getAllBooksByRatingFetch = (tags?: string[]): IBookAsyncActions => ({
    type: GET_ALL_BOOKS_BY_RATING,
    tags: tags
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

export const updateBook = (book: IBookFromDb) : IBookActions => ({
    type: UPDATE_AUTHOR_BOOK,
    book: book
})

export const deleteBookFetch = (id: number): IBookAsyncActionsById => ({
    type: DELETE_AUTHOR_BOOK,
    id: id
})

