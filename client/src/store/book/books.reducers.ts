import {IBook} from "../../../../interfaces";
import {
    ADD_AUTHOR_BOOK,
    ADD_BOOK,
    DELETE_AUTHOR_BOOK,
    SET_ALL_BOOKS,
    SET_AUTHOR_BOOKS
} from "./books.constants";
import {IBookActions, IBooksActions} from "./book.interfaces"

export interface IBooksState {
    books: IBook[],
    myBook: IBook[]
}

const initialState: IBooksState = {
    books: [],
    myBook: [],
}

export const bookReducer = (
    state: IBooksState = initialState,
    action: IBookActions | IBooksActions
): IBooksState => {
    switch (action.type) {
        case SET_ALL_BOOKS:
            return {
                ...state,
                books: action.books as IBook[]
            }
        case SET_AUTHOR_BOOKS:
            return {
                ...state,
                myBook: action.books as IBook[]
            }
        case ADD_AUTHOR_BOOK:
            return {
                ...state,
                myBook: [
                    ...state.myBook,
                    action.book as IBook
                ]
            }
        case ADD_BOOK:
            return {
                ...state,
                books: [
                    ...state.books,
                    action.book
                ]
            }
        case DELETE_AUTHOR_BOOK:
            return {
                ...state,
                myBook: state.myBook
                    .filter(({id}) => id !== action.book.id)

            }
        default:
            return state
    }
}

export type BooksReducers = typeof bookReducer