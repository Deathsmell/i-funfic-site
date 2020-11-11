import {
    ADD_AUTHOR_BOOK,
    ADD_BOOK,
    DELETE_AUTHOR_BOOK,
    SET_ALL_BOOKS,
    SET_AUTHOR_BOOKS,
    UPDATE_AUTHOR_BOOK,
} from "./books.constants";
import {IBookActions, IBookActionsById, IBooksActions} from "./book.interfaces"
import {IBookFromDb} from "../../../../interfaces/IBook";

export interface IBooksState {
    books: IBookFromDb[],
    myBook: IBookFromDb[]
}

const initialState: IBooksState = {
    books: [],
    myBook: [],
}

export const bookReducer = (
    state: IBooksState = initialState,
    action: IBookActions | IBooksActions | IBookActionsById
): IBooksState => {
    switch (action.type) {
        case SET_ALL_BOOKS:
            return {
                ...state,
                books: action.books
            }
        case SET_AUTHOR_BOOKS:
            const newVar = {
                ...state,
                myBook: action.books
            };
            console.log("SET",state,newVar)
            return newVar
        case ADD_AUTHOR_BOOK:
            console.log(action.book)
            return {
                ...state,
                myBook: [
                    ...state.myBook.filter(({id}) => id !== action.book.id),
                    action.book
                ]
            }
        case ADD_BOOK:
            return {
                ...state,
                books: [
                    ...state.books.filter(({id}) => id !== action.book.id),
                    action.book
                ]
            }
        case DELETE_AUTHOR_BOOK:
            return {
                ...state,
                myBook: state.myBook
                    .filter(({id}) => id !== action.id)

            }
        case UPDATE_AUTHOR_BOOK:
            return {
                ...state,
                myBook: [
                    ...state.myBook.filter(({id}) => id !== action.book.id),
                    action.book
                ]
            }
        default:
            return {
                myBook: state.myBook,
                books: state.books
            }
    }
}

export type BooksReducers = typeof bookReducer