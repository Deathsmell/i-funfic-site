import {CREATE_BOOK, GET_ALL_BOOKS, GET_AUTHOR_BOOKS} from "./books.constants"
import {IBookActions, IBookAsyncActions} from "./book.interfaces"
import {call, put, takeEvery} from "redux-saga/effects"
import {BookApi} from "../../api";
import {setCommonBooks, addMyBook, setMyBooks} from "./books.actions";
import {IBook} from "../../../../interfaces";
import {push} from "connected-react-router";

function* allBookWorker() {
    console.log("Book worker")
    try {
        const {data}: { data: { message?: string, book: IBook[] } } = yield call(BookApi.getAll);
        console.log(data)
        yield put<IBookActions>(setCommonBooks(data.book))
    } catch (e) {
        console.error(e)
    }
}

function* createBookWorker(action: IBookAsyncActions) {
    try {
        const {data}: { data: { message?: string, book: IBook } }
            = yield call(BookApi.create, action.payload as IBook);
        yield put<IBookActions>(addMyBook(data.book))
        yield put(push("/profile"))
    } catch (e) {
        console.error(e)
    }
}

function* authorBookWorker(action: IBookAsyncActions) {
    console.log("Author book worker", action.payload)
    try {
        const {data}: { data: { message?: string, book: IBook[] } }
            = yield call(BookApi.getByAuthorId, action.payload as number);
        yield put<IBookActions>(setMyBooks(data.book))
    } catch (e) {
        console.log(e);
    }
}

export default function* watcher() {
    console.log("BOOK WATCHER")
    yield takeEvery<IBookAsyncActions>(GET_ALL_BOOKS, allBookWorker)
    yield takeEvery<IBookAsyncActions>(CREATE_BOOK, createBookWorker)
    yield takeEvery<IBookAsyncActions>(GET_AUTHOR_BOOKS, authorBookWorker)
}