import {call, put, takeLeading} from "@redux-saga/core/effects";
import {push} from "connected-react-router";
import {ICredentialAction, ILoginAction, IRegistrationAction} from "./credential.interfaces"
import {authorise, clearCredential} from "./credential.actions"
import {AuthApi, LOGIN_URL} from "../../api";
import {MAIN_PAGE_URL} from "../../api/fetch";
import {LOGIN, LOGOUT, REGISTRATION} from "./credential.costants";


function* loginWorker(action: ILoginAction) {
    try {
        const {data} = yield call(AuthApi.login, action.payload);
        console.log(data)
        yield put<ICredentialAction>(authorise(data))
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