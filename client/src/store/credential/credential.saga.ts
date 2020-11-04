import {call, put, takeLeading} from "@redux-saga/core/effects";
import {push} from "connected-react-router";
import {ICredentialAction, ILoginAction, IRegistrationAction} from "./credential.interfaces"
import {authorise, clearCredential} from "./credential.actions"
import {LOGIN_URL,MAIN_PAGE_URL} from "@api";
import {AuthApi} from "../../api"
import {LOGIN, LOGOUT, REGISTRATION} from "./credential.costants";
import {IBookAsyncActions} from "../book/book.interfaces";
import {getBooksByAuthorIdFetch} from "../book/books.actions";


function* loginWorker(action: ILoginAction) {
    try {
        const {data} = yield call(AuthApi.login, action.payload);
        yield put<ICredentialAction>(authorise(data))
        yield put<IBookAsyncActions<number>>(getBooksByAuthorIdFetch(data.id))
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
    yield call(AuthApi.logout)
    yield put(clearCredential())
    yield put(push(MAIN_PAGE_URL))
}


export default function* watcher() {
    yield takeLeading(REGISTRATION, registrationWorker)
    yield takeLeading(LOGIN, loginWorker)
    yield takeLeading(LOGOUT, logoutWorker)
}