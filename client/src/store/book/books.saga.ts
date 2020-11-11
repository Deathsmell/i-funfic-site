import {AxiosResponse} from "axios";
import {
    CREATE_AUTHOR_BOOK,
    DELETE_AUTHOR_BOOK,
    GET_ALL_BOOKS,
    GET_AUTHOR_BOOKS,
    UPDATE_AUTHOR_BOOK,
} from "./books.constants"
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
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";
import {IBookResponse, IBooksResponse} from "../../../../interfaces/IResponse";

function* allBookWorker() {
    try {
        const {data}: AxiosResponse<IBooksResponse> = yield call(BookApi.getAll);
        yield put<IBooksActions>(setCommonBooks(data.books))
    } catch (e) {
        console.error(e)
    }
}

function* createBookWorker(action: IBookAsyncActionsByBook) {
    try {
        const {data}: AxiosResponse<IBookResponse>
            = yield call(BookApi.create, action.book) ;
        console.log("Create",data.message)
        yield put<IBookActions>(addMyBook(data.book))
        yield put<IBookActions>(addBook(data.book))
        yield put(push(ApplicationDynamicMap.editBookPage(data.book.id)))
    } catch (e) {
        console.error(e)
    }
}

function* authorBookWorker(action: IBookAsyncActionsById) {
    try {
        const {data}: AxiosResponse<IBooksResponse>
            = yield call(BookApi.getByAuthorId, action.id);
        yield put<IBooksActions>(setMyBooks(data.books))
    } catch (e) {
        console.error(e);
    }
}

function* deleteAuthorBookWorker(action: IBookAsyncActionsById) {
    try {
        if (action.id) {
            yield call(BookApi.deleteById, action.id);
        }
    } catch (e) {
        console.error(e)
    }
}

function* updateAuthorBookWorker(action: IBookAsyncActionsByBook) {
    try {
        yield call(BookApi.update, action.book);
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    yield takeEvery<IBookAsyncActions>(GET_ALL_BOOKS, allBookWorker)
    yield takeEvery<IBookAsyncActionsByBook>(CREATE_AUTHOR_BOOK, createBookWorker)
    yield takeEvery<IBookAsyncActionsById>(GET_AUTHOR_BOOKS, authorBookWorker)
    yield takeEvery<IBookAsyncActionsById>(DELETE_AUTHOR_BOOK, deleteAuthorBookWorker)
    yield takeEvery<IBookAsyncActionsByBook>(UPDATE_AUTHOR_BOOK, updateAuthorBookWorker)
}