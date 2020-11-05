import {CREATE_AUTHOR_BOOK, DELETE_AUTHOR_BOOK, GET_ALL_BOOKS, GET_AUTHOR_BOOKS} from "./books.constants"
import {
    IBookActions,
    IBookAsyncActions,
    IBookAsyncActionsByBook,
    IBookAsyncActionsById,
    IBooksActions
} from "./book.interfaces"
import {call, put, takeEvery} from "redux-saga/effects"
import {BookApi} from "../../api";
import {addBook, addMyBook, setCommonBooks, setMyBooks} from "./books.actions";
import {IBook} from "../../../../interfaces";
import {push} from "connected-react-router";

function* allBookWorker() {
    try {
        const {data}: { data: { message?: string, book: IBook[] } } = yield call(BookApi.getAll);
        console.log(data)
        yield put<IBooksActions>(setCommonBooks(data.book))
    } catch (e) {
        console.error(e)
    }
}

function* createBookWorker(action: IBookAsyncActionsByBook) {
    try {
        const {data}: { data: { message?: string, book: IBook } }
            = yield call(BookApi.create, action.book);
        console.log("add test1", addMyBook(data.book).type)
        yield put<IBookActions>(addMyBook(data.book))
        console.log("add book2", addBook(data.book).type)
        yield put<IBookActions>(addBook(data.book))
        yield put(push("/profile"))
    } catch (e) {
        console.error(e)
    }
}

function* authorBookWorker(action: IBookAsyncActionsById) {
    try {
        const {data}: { data: { message?: string, book: IBook[] } }
            = yield call(BookApi.getByAuthorId, action.id);
        yield put<IBooksActions>(setMyBooks(data.book))
    } catch (e) {
        console.error(e);
    }
}

function* deleteAuthorBookWorker(action: IBookAsyncActionsByBook) {
    try {
        const user = action.book;
        if (user && user.id) {
            yield call(BookApi.deleteById, user.id);
        }
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    yield takeEvery<IBookAsyncActions>(GET_ALL_BOOKS, allBookWorker)
    yield takeEvery<IBookAsyncActionsByBook>(CREATE_AUTHOR_BOOK, createBookWorker)
    yield takeEvery<IBookAsyncActionsById>(GET_AUTHOR_BOOKS, authorBookWorker)
    yield takeEvery<IBookAsyncActionsByBook>(DELETE_AUTHOR_BOOK, deleteAuthorBookWorker)
}