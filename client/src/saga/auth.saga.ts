import {call, put, takeLeading} from "@redux-saga/core/effects";
import {AUTHORISE, IAuthActions, LOGIN} from "../store/auth/login/types";
import {CLEAR_CREDENTIAL} from "../store/auth/types"
import {AuthApi,LOGIN_URL} from "../api";
import {LoginAction} from "../store/auth/login/actions";
import {IRegistrationAction, REGISTRATION} from "../store/auth/registration/types";
import {push} from "connected-react-router";
import {CLEAR_FIELD, LOGOUT} from "../store/auth/types";
import {MAIN_PAGE_URL} from "../api/fetch";


function* loginWorker(action: LoginAction) {
    try {
        const {data} = yield call(AuthApi.login, action.payload);
        console.log(data)
        yield put<IAuthActions>({type: AUTHORISE, payload: data})
        yield put(push("/"))
    } catch (e) {
        console.error(e)
    }
}

function* registrationWorker(action: IRegistrationAction) {
    try {
        const {data} = yield call(AuthApi.registration, action.payload);
        console.log(data)
        yield put({type: CLEAR_FIELD})
        yield put(push(LOGIN_URL))
    } catch (e) {
        console.error(e)
    }
}

function* logoutWorker(){
    yield call(AuthApi.logout)
    yield put({type:CLEAR_CREDENTIAL})
    yield put(push(MAIN_PAGE_URL))
}


export default function* watcher() {
    yield takeLeading(REGISTRATION, registrationWorker)
    yield takeLeading(LOGIN, loginWorker)
    yield takeLeading(LOGOUT, logoutWorker)
}