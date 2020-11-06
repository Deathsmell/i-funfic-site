import {call, put, takeEvery} from "redux-saga/effects"
import {CREATE_CHAPTER, DELETE_CHAPTER, GET_ALL_CHAPTER_BY_BOOK_ID, UPDATE_CHAPTER} from "./chapters.constants";
import {ChapterApi} from "../../api/chapter";
import {
    IChapterAction,
    IChapterActionById,
    IChapterAsyncAction,
    IChapterAsyncActionById,
    IChaptersAction
} from "./chapters.interfaces";
import {addChapter, addChapters, deleteChapter, updateChapter} from "./chapters.actions";
import {push} from "connected-react-router";
import {ApplicationDynamicMap, ApplicationMap} from "../../routes";

function* getAllWorker(action: IChapterAsyncActionById) {
    try {
        const {chapters} = yield call(ChapterApi.getAll, action.id);
        yield put<IChaptersAction>(addChapters(chapters))
    } catch (e) {
        console.error(e)
    }
}

function* addChapterWorker(action: IChapterAsyncAction) {
    try {
        const {data: {chapter}} = yield call(ChapterApi.createChapter, action.chapter);
        console.log(chapter)
        yield put<IChapterAction>(addChapter(chapter))
        yield put(push(ApplicationDynamicMap.bookPage(chapter.bookId)))
    } catch (e) {
        console.error(e)
    }
}

function* deleteChapterWorker(action: IChapterAsyncActionById) {
    try {
        yield call(ChapterApi.deleteChapter, action.id)
        yield put<IChapterActionById>(deleteChapter(action.id))
        yield put(push(ApplicationMap.MAIN_PAGE))
    } catch (e) {
        console.error(e)
    }
}

function* updateChapterWorker(action: IChapterAsyncAction) {
    try {
        const {chapter} = yield call(ChapterApi.updateChapter,action.chapter);
        yield put(updateChapter(chapter))
        yield put(push(ApplicationDynamicMap.bookPage(chapter.bookId)))
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    yield takeEvery<IChapterAsyncActionById>(GET_ALL_CHAPTER_BY_BOOK_ID, getAllWorker)
    yield takeEvery<IChapterAsyncActionById>(DELETE_CHAPTER, deleteChapterWorker)
    yield takeEvery<IChapterAsyncAction>(UPDATE_CHAPTER, updateChapterWorker)
    yield takeEvery<IChapterAsyncAction>(CREATE_CHAPTER, addChapterWorker)
}