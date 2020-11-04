import {IBook} from "../../../../interfaces";
import {ALL_BOOKS, AUTHOR_BOOKS} from "./books.constants";
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
        case ALL_BOOKS:
            return {
                ...state,
                books: action.payload
            }
        case AUTHOR_BOOKS:
            return {
                ...state,
                myBook: [
                    ...state.myBook,
                    ...action.payload
            ]
            }
        default: return state
    }
}

export type BooksReducers = typeof bookReducer