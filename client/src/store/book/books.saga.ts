import {AxiosResponse} from "axios";
import {
    CREATE_AUTHOR_BOOK,
    DELETE_AUTHOR_BOOK,
    GET_ALL_BOOKS,
    GET_ALL_BOOKS_BY_RATING,
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
import {call, put, takeLeading} from "redux-saga/effects"
import {BookApi} from "../../api";
import {addBook, addMyBook, setCommonBooks, setMyBooks} from "./books.actions";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";
import {IBookResponse, IBooksResponse} from "../../../../interfaces/IResponse";

function* allBookWorker(action: IBookAsyncActions) {
    try {
        let books = []
        if (action.tags) {
            const {data}: AxiosResponse<IBooksResponse> = yield call(BookApi.getAllByTags, action.tags);
            books = data.books
        } else {
            const {data}: AxiosResponse<IBooksResponse> = yield call(BookApi.getAll);
            books = data.books
        }
        yield put<IBooksActions>(setCommonBooks(books))
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

function* allBookByRatingWorker(action : IBookAsyncActions) {
    let books = []
    if (action.tags) {
        const {data}: AxiosResponse<IBooksResponse> = yield call(BookApi.getAllOrderRatingByTags, action.tags);
        books = data.books
    } else {
        const {data}: AxiosResponse<IBooksResponse> = yield call(BookApi.getAllOrderRating);
        books = data.books
    }
    yield put<IBooksActions>(setCommonBooks(books))

}

export default function* watcher() {
    yield takeLeading<IBookAsyncActions>(GET_ALL_BOOKS, allBookWorker)
    yield takeLeading<IBookAsyncActions>(GET_ALL_BOOKS_BY_RATING, allBookByRatingWorker)
    yield takeLeading<IBookAsyncActionsByBook>(CREATE_AUTHOR_BOOK, createBookWorker)
    yield takeLeading<IBookAsyncActionsById>(GET_AUTHOR_BOOKS, authorBookWorker)
    yield takeLeading<IBookAsyncActionsById>(DELETE_AUTHOR_BOOK, deleteAuthorBookWorker)
    yield takeLeading<IBookAsyncActionsByBook>(UPDATE_AUTHOR_BOOK, updateAuthorBookWorker)
}