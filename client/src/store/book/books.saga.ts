import {CREATE_BOOK, GET_ALL_BOOKS} from "./books.constants"
import {IBookActions, IBookAsyncActions} from "./book.interfaces"
import {call, put, takeEvery} from "redux-saga/effects"
import {BookApi} from "../../api";
import {setCommonBooks, setMyBooks} from "./books.actions";
import {IBook} from "../../../../interfaces";
import {push} from "connected-react-router";

function* allBookWorker() {
    console.log("Book worker")
    try {
        const {data}:{data:{message?: string, book: IBook[]}} = yield call(BookApi.getAll);
        console.log(data)
        yield put<IBookActions>(setCommonBooks(data.book))
    } catch (e) {
        console.error(e)
    }
}

function* createBookWorker(action: IBookAsyncActions) {
    try {
        console.log("Book create", action.payload)
        if (typeof action.payload === "object") {
            const {data}: { data: { message?: string, book: IBook } } = yield call(BookApi.create, action.payload);
            yield put<IBookActions>(setMyBooks([data.book]))
            yield put(push("/profile"))
        }
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    console.log("BOOK WATCHER")
    yield takeEvery<IBookAsyncActions>(GET_ALL_BOOKS, allBookWorker)
    yield takeEvery<IBookAsyncActions>(CREATE_BOOK, createBookWorker)
}