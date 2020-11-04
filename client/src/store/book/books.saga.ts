import {CREATE_AUTHOR_BOOK, DELETE_AUTHOR_BOOK, GET_ALL_BOOKS, GET_AUTHOR_BOOKS} from "./books.constants"
import {IBookActions, IBookAsyncActions} from "./book.interfaces"
import {call, put, takeEvery} from "redux-saga/effects"
import {BookApi} from "../../api";
import {setCommonBooks, addMyBook, setMyBooks} from "./books.actions";
import {IBook} from "../../../../interfaces";
import {push} from "connected-react-router";

function* allBookWorker() {
    try {
        const {data}: { data: { message?: string, book: IBook[] } } = yield call(BookApi.getAll);
        console.log(data)
        yield put<IBookActions<IBook[]>>(setCommonBooks(data.book))
    } catch (e) {
        console.error(e)
    }
}

function* createBookWorker(action: IBookAsyncActions<IBook>) {
    try {
        const {data}: { data: { message?: string, book: IBook } }
            = yield call(BookApi.create, action.payload);
        yield put<IBookActions<IBook>>(addMyBook(data.book))
        yield put(push("/profile"))
    } catch (e) {
        console.error(e)
    }
}

function* authorBookWorker(action: IBookAsyncActions<number>) {
    try {
        const {data}: { data: { message?: string, book: IBook[] } }
            = yield call(BookApi.getByAuthorId, action.payload);
        yield put<IBookActions<IBook[]>>(setMyBooks(data.book))
    } catch (e) {
        console.error(e);
    }
}

function* deleteAuthorBookWorker(action: IBookAsyncActions<IBook>) {
    try {
        const user = action.payload;
        if (user && user.id){
            yield call(BookApi.deleteById,user.id);
        }
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    yield takeEvery<IBookAsyncActions>(GET_ALL_BOOKS, allBookWorker)
    yield takeEvery<IBookAsyncActions<IBook>>(CREATE_AUTHOR_BOOK, createBookWorker)
    yield takeEvery<IBookAsyncActions<number>>(GET_AUTHOR_BOOKS, authorBookWorker)
    yield takeEvery<IBookAsyncActions<IBook>>(DELETE_AUTHOR_BOOK,deleteAuthorBookWorker)
}