import {all} from "@redux-saga/core/effects";
import authWatcher from "./credential/credential.saga"
import bookWatcher from "./book/books.saga"
import chapterWatcher from "./chapters/chapters.saga"

export default function* rootSaga () {
    yield all([
        authWatcher(),
        bookWatcher(),
        chapterWatcher(),
    ])
}
