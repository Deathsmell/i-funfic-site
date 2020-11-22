import {call, put, select, takeLeading} from "@redux-saga/core/effects";
import {push} from "connected-react-router";
import {ICredentialAction, ILoginAction, IRegistrationAction} from "./credential.interfaces"
import {authorise, clearCredential} from "./credential.actions"
import {LOGIN_URL, MAIN_PAGE_URL} from "@api";
import {AuthApi} from "../../api"
import {AUTH_REDIRECT, CHECK_AUTH, LOGIN, LOGOUT, REGISTRATION} from "./credential.costants";
import {IBookAsyncActionsById} from "../book/book.interfaces";
import {getBooksByAuthorIdFetch} from "../book/books.actions";
import {selectorAuthorise} from "./credential.selectors";
import {clearChapters} from "../chapters/chapters.actions";
import {Action} from "redux";


function* loginWorker(action: ILoginAction) {
    try {
        const {data} = yield call(AuthApi.login, action.payload);
        console.log("LOGIN")
        localStorage.setItem("token", data.token)
        yield put<ICredentialAction>(authorise(data))
        yield put<Action>(clearChapters())
        yield put<IBookAsyncActionsById>(getBooksByAuthorIdFetch(data.id))
        yield put(push("/"))
    } catch (e) {
        console.error(e)
    }
}

function* registrationWorker(action: IRegistrationAction) {
    try {
        const {data} = yield call(AuthApi.registration, action.payload);
        console.log(data)
        yield put(push(LOGIN_URL))
    } catch (e) {
        console.error(e)
    }
}

function* logoutWorker() {
    localStorage.removeItem("token")
    yield call(AuthApi.logout)
    yield put(clearCredential())
    yield put(push(MAIN_PAGE_URL))
}


function* checkWorker() {
    try {
        const auth = yield select(selectorAuthorise);
        if (auth)
            yield call(AuthApi.check);
    } catch (e) {
        yield put(clearCredential())
    }
}

function* authRedirectWorker() {
    try {
        const {data} = yield call(AuthApi.check);
        yield put<ICredentialAction>(authorise(data))
        yield put<Action>(clearChapters())
        yield put<IBookAsyncActionsById>(getBooksByAuthorIdFetch(data.id))
        yield put(push("/"))
    } catch (e) {
        console.error("Some error when do auth redirect")
    }
}

export default function* watcher() {
    yield takeLeading(REGISTRATION, registrationWorker)
    yield takeLeading(LOGIN, loginWorker)
    yield takeLeading(LOGOUT, logoutWorker)
    yield takeLeading(CHECK_AUTH, checkWorker)
    yield takeLeading(AUTH_REDIRECT, authRedirectWorker)
}