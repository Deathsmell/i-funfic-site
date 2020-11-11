import {createSelector} from "reselect";
import {RootState} from "../reducers";

const selectBooks = (state: RootState) => state.books

export const selectorBook = (id: number) => createSelector(
    selectBooks,
    books => books.books.find(book => book.id === id)
)

export const selectorMyBooks = () => createSelector(
    selectBooks,
    books => books.myBook
)