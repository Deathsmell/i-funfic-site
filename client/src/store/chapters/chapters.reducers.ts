import {IChapterAction, IChapterActionById, IChaptersAction, IChapterState} from "./chapters.interfaces"
import {
    ADD_CHAPTER,
    CLEAR_CHAPTERS,
    DELETE_CHAPTER,
    DELETE_CHAPTER_BY_BOOK_ID,
    SET_CHAPTERS,
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
                ...state.filter(({id, bookId}) =>
                    action.chapter.bookId === bookId && action.chapter.id !== id),
                action.chapter
            ]
        case SET_CHAPTERS:
            return [
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