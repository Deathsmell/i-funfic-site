import {createSelector} from "reselect";
import {RootState} from "../reducers";

const selectBooks = (state: RootState) => state.books.books

export const selectorBook = (id: number) => createSelector(
    selectBooks,
    books => books.find(book => book.id === id)
)