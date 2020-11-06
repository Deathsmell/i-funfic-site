import {IChapterAction, IChapterActionById, IChaptersAction, IChapterState} from "./chapters.interfaces"
import {
    ADD_CHAPTER,
    ADD_CHAPTERS,
    CLEAR_CHAPTERS,
    DELETE_CHAPTER,
    DELETE_CHAPTER_BY_BOOK_ID,
    UPDATE_CHAPTER
} from "./chapters.constants";

const initialState: IChapterState = []

export const chaptersReducer = (
    state: IChapterState = initialState,
    action: IChapterAction | IChaptersAction | IChapterActionById
): IChapterState => {
    switch (action.type) {
        case ADD_CHAPTER:
            return [
                ...state.filter(({id}) => action.chapter.id !== id),
                action.chapter
            ]
        case ADD_CHAPTERS:
            return [
                ...state.filter(({id}) => {
                   return action.chapters.some((newChapter) => newChapter.id === id)
                }),
                ...action.chapters
            ]
        case CLEAR_CHAPTERS:
            return []
        case UPDATE_CHAPTER:
            return [
                ...state.filter(({id}) => action.chapter.id),
                action.chapter
            ]
        case DELETE_CHAPTER:
            return [
                ...state.filter(({id}) => id !== action.id)
            ]
        case DELETE_CHAPTER_BY_BOOK_ID:
            return [
                ...state.filter(({bookId}) => bookId !== action.id)
            ]
        default:
            return state
    }
}

export type ChapterReducer = typeof chaptersReducer