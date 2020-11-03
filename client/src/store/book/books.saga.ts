import {ALL_BOOKS, GET_ALL_BOOKS, IBookActions, IBookAsyncActions} from "./books.types"
import {call, put, takeEvery} from "redux-saga/effects"
import {BookApi} from "../../api/book";

function* allBookWorker() {
    console.log("Book worker")
    try {
        const {data} = yield call(BookApi.getAll);
        console.log(data)
        yield put<IBookActions>({type: ALL_BOOKS, payload: data.book})
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    console.log("BOOK WATCHER")
    yield takeEvery<IBookAsyncActions>(GET_ALL_BOOKS, allBookWorker)
}