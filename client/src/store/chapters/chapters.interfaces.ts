import {IBookChapter} from "../../../../interfaces";
import {
    ADD_CHAPTER,
    ADD_CHAPTERS,
    CLEAR_CHAPTERS,
    CREATE_CHAPTER,
    DELETE_CHAPTER, DELETE_CHAPTER_BY_BOOK_ID,
    GET_ALL_CHAPTER_BY_BOOK_ID,
    UPDATE_CHAPTER
} from "./chapters.constants"


export interface IChapterState extends Array<IBookChapter>{}


export interface IChapterAction {
    type: typeof ADD_CHAPTER | typeof UPDATE_CHAPTER,
    chapter: IBookChapter
}

export interface IChaptersAction {
    type: typeof ADD_CHAPTERS | typeof CLEAR_CHAPTERS,
    chapters: IBookChapter[]
}

export interface IChapterActionById {
    type: typeof DELETE_CHAPTER | typeof DELETE_CHAPTER_BY_BOOK_ID,
    id: number
}

export interface IChapterAsyncAction {
    type: typeof CREATE_CHAPTER | typeof UPDATE_CHAPTER,
    chapter: IBookChapter
}

export interface IChapterAsyncActionById {
    type: typeof GET_ALL_CHAPTER_BY_BOOK_ID | typeof DELETE_CHAPTER,
    id: number
}