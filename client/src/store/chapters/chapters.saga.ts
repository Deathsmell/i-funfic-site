import {AxiosResponse} from "axios"
import {call, put, takeLeading} from "redux-saga/effects"
import {CREATE_CHAPTER, DELETE_CHAPTER, GET_ALL_CHAPTER_BY_BOOK_ID, UPDATE_CHAPTER} from "./chapters.constants";
import {ChapterApi} from "../../api/chapter";
import {
    IChapterAction,
    IChapterActionById,
    IChapterAsyncAction,
    IChapterAsyncActionById,
    IChaptersAction
} from "./chapters.interfaces";
import {addChapter, deleteChapter, setChapters, updateChapter} from "./chapters.actions";
import {push} from "connected-react-router";
import {ApplicationDynamicMap, ApplicationMap} from "../../routes";
import {IChapterResponse, IChaptersResponse} from "../../../../interfaces/IResponse";

function* getAllWorker(action: IChapterAsyncActionById) {
    try {
        const {data: {chapters}}: AxiosResponse<IChaptersResponse> = yield call(ChapterApi.getAll, action.id);
        console.log(chapters,"CHAPTERE")
        yield put<IChaptersAction>(setChapters(chapters))
    } catch (e) {
        console.error(e)
    }
}

function* addChapterWorker(action: IChapterAsyncAction) {
    try {
        const {data: {chapter}}:AxiosResponse<IChapterResponse> = yield call(ChapterApi.createChapter, action.chapter);
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
        const {data:{chapter}}:AxiosResponse<IChapterResponse> = yield call(ChapterApi.updateChapter,action.chapter);
        yield put(updateChapter(chapter))
        yield put(push(ApplicationDynamicMap.bookPage(chapter.bookId)))
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    yield takeLeading<IChapterAsyncActionById>(GET_ALL_CHAPTER_BY_BOOK_ID, getAllWorker)
    yield takeLeading<IChapterAsyncActionById>(DELETE_CHAPTER, deleteChapterWorker)
    yield takeLeading<IChapterAsyncAction>(UPDATE_CHAPTER, updateChapterWorker)
    yield takeLeading<IChapterAsyncAction>(CREATE_CHAPTER, addChapterWorker)
}