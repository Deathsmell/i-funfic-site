import {
    ADD_CHAPTER,
    SET_CHAPTERS,
    CLEAR_CHAPTERS,
    CREATE_CHAPTER,
    DELETE_CHAPTER, DELETE_CHAPTER_BY_BOOK_ID,
    GET_ALL_CHAPTER_BY_BOOK_ID,
    UPDATE_CHAPTER
} from "./chapters.constants"
import {
    IChapterAction,
    IChapterActionById,
    IChapterAsyncAction,
    IChapterAsyncActionById,
    IChaptersAction
} from "./chapters.interfaces"
import {IChapter, IChapterFromDb} from "../../../../interfaces/IChapter";
import {Action} from "redux";


export const createChapter = (chapter: IChapter): IChapterAsyncAction => ({
    type: CREATE_CHAPTER,
    chapter: chapter
})

export const addChapter = (chapter: IChapterFromDb): IChapterAction => ({
    type: ADD_CHAPTER,
    chapter: chapter
})

export const setChapters = (chapters: IChapterFromDb[]): IChaptersAction => ({
    type: SET_CHAPTERS,
    chapters: chapters
})

export const getAllChaptersFetch = (bookId: number): IChapterAsyncActionById => ({
    type: GET_ALL_CHAPTER_BY_BOOK_ID,
    id: bookId
})

export const updateChapterFetch = (chapter: IChapter): IChapterAsyncAction => ({
    type: UPDATE_CHAPTER,
    chapter: chapter
})

export const updateChapter = (chapter: IChapterFromDb): IChapterAction => ({
    type: UPDATE_CHAPTER,
    chapter: chapter
})

export const deleteChapterFetch = (id: number): IChapterAsyncActionById => ({
    type: DELETE_CHAPTER,
    id: id
})

export const deleteChapter = (id: number): IChapterActionById => ({
    type: DELETE_CHAPTER,
    id: id
})

export const deleteChapterByBookId = (id: number) : IChapterActionById => ({
    type: DELETE_CHAPTER_BY_BOOK_ID,
    id: id
})

export const clearChapters = (): Action => ({
    type: CLEAR_CHAPTERS
})