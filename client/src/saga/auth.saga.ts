import {call, put, takeLeading} from "@redux-saga/core/effects";
import {AUTHORISE, IAuthActions, LOGIN} from "../store/auth/login/types";
import {AuthApi} from "../api";
import {LoginAction} from "../store/auth/login/action";
import {IRegistrationAction, REGISTRATION} from "../store/auth/registration/types";
import {push} from "connected-react-router";
import {CLEAR_FIELD} from "../store/auth/types";


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
        yield put(push("/login"))
    } catch (e) {
        console.error(e)
    }
}


export default function* watcher() {
    yield takeLeading(REGISTRATION, registrationWorker)
    yield takeLeading(LOGIN, loginWorker)
}