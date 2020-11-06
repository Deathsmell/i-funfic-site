import {createSelector} from "reselect";
import {RootState} from "../reducers";

const selectChapters = (state: RootState) => state.chapters

export const selectorChapters = (id: number) => createSelector(
    selectChapters,
    chapters => chapters.filter(({bookId}) => bookId === id)
)

export const selectorChapter = (chapterId: number) => createSelector(
    selectChapters,
    chapters => chapters.find(({id}) => id === chapterId)
)