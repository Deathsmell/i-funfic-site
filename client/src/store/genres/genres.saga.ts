import {AxiosResponse} from "axios"
import {call, put, takeEvery} from "redux-saga/effects"
import {IGenresAction, IGenresAsyncAction} from "./genres.interfaces";
import {GET_GENRES} from "./genres.types";
import {BookApi} from "../../api";
import {IGenresResponse} from "../../../../interfaces/IResponse";
import {setGenres} from "./genres.actions";


function* getGenresWorker() {
    try {
        const {data: {genres}}: AxiosResponse<IGenresResponse> = yield call(BookApi.getAllGenres);
        yield put<IGenresAction>(setGenres(genres))
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    yield takeEvery<IGenresAsyncAction>(GET_GENRES, getGenresWorker)
}