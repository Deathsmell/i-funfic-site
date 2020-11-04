import {all} from "@redux-saga/core/effects";
import authWatcher from "./credential/credential.saga"
import bookWatcher from "../store/book/books.saga"

export default function* rootSaga () {
    yield all([
        authWatcher(),
        bookWatcher(),
    ])
}
