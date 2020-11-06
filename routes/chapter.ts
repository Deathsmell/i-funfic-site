import {IRouter} from "express"
import {
    CREATE_CHAPTER_URL,
    DELETE_CHAPTER_URL,
    GET_ALL_CHAPTERS_BY_BOOK_ID_URL,
    UPDATE_CHAPTER_URL
} from "../api";
import {ensureAuthenticated} from "../config/passport";
import ChapterController from "../controllers/ChapterController";

export const chapterRouter = (router: IRouter) => {
    router.post(CREATE_CHAPTER_URL,ensureAuthenticated,ChapterController.createChapter)
    router.get(GET_ALL_CHAPTERS_BY_BOOK_ID_URL,ChapterController.getAll)
    router.post(UPDATE_CHAPTER_URL,ChapterController.updateChapter)
    router.delete(DELETE_CHAPTER_URL, ChapterController.deleteChapter)
}