import {IBook} from "../../../../interfaces";
import {ADD_AUTHOR_BOOK, SET_ALL_BOOKS, SET_AUTHOR_BOOKS} from "./books.constants";
import {IBookActions} from "./book.interfaces"

export interface IBooksState {
    books: IBook[],
    myBook: IBook[]
}

const initialState: IBooksState = {
    books: [],
    myBook: [],
}

export const bookReducer = (
    state:IBooksState = initialState,
    action: IBookActions
): IBooksState => {
    switch (action.type){
        case SET_ALL_BOOKS:
            return {
                ...state,
                books: action.payload as IBook[]
            }
        case SET_AUTHOR_BOOKS:
            return {
                ...state,
                myBook: action.payload as IBook[]
            }
        case ADD_AUTHOR_BOOK:
            return {
                ...state,
                myBook: [
                    ...state.myBook,
                    action.payload as IBook
                ]
            }
        default: return state
    }
}

export type BooksReducers = typeof bookReducer