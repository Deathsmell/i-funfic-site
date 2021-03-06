import {IChapter, IChapterFromDb} from "../../../../interfaces/IChapter";
import {
    ADD_CHAPTER,
    SET_CHAPTERS,
    CLEAR_CHAPTERS,
    CREATE_CHAPTER,
    DELETE_CHAPTER, DELETE_CHAPTER_BY_BOOK_ID,
    GET_ALL_CHAPTER_BY_BOOK_ID,
    UPDATE_CHAPTER
} from "./chapters.constants"


export interface IChapterState extends Array<IChapterFromDb>{}


export interface IChapterAction {
    type: typeof ADD_CHAPTER | typeof UPDATE_CHAPTER,
    chapter: IChapterFromDb
}

export interface IChaptersAction {
    type: typeof SET_CHAPTERS | typeof CLEAR_CHAPTERS,
    chapters: IChapterFromDb[]
}

export interface IChapterActionById {
    type: typeof DELETE_CHAPTER | typeof DELETE_CHAPTER_BY_BOOK_ID,
    id: number
}

export interface IChapterAsyncAction {
    type: typeof CREATE_CHAPTER | typeof UPDATE_CHAPTER,
    chapter: IChapter
}

export interface IChapterAsyncActionById {
    type: typeof GET_ALL_CHAPTER_BY_BOOK_ID | typeof DELETE_CHAPTER,
    id: number
}