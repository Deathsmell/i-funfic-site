import {GET_ALL_BOOKS} from "./books.constants"
import {IBookActions, IBookAsyncActions} from "./book.interfaces"
import {call, put, takeEvery} from "redux-saga/effects"
import {BookApi} from "../../api";
import {setCommonBooks} from "./books.actions";

function* allBookWorker() {
    console.log("Book worker")
    try {
        const {data} = yield call(BookApi.getAll);
        console.log(data)
        yield put<IBookActions>(setCommonBooks(data.book))
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    console.log("BOOK WATCHER")
    yield takeEvery<IBookAsyncActions>(GET_ALL_BOOKS, allBookWorker)
}