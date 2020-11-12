import {put, select, takeEvery} from "redux-saga/effects"
import {IWebsocketAction, IWebsocketAsyncAction} from "./websocket.interfaces";
import {CONNECTING} from "./websocket.constants";
import {selectorWebsocket} from "./websocket.selector";
import {setConnection} from "./websocket.actions";


function* connectWorker() {
    const ws = yield select(selectorWebsocket);
    if (!ws) {
        const webSocket = new WebSocket("ws://localhost:5000")
        yield put<IWebsocketAction>(setConnection(webSocket))
        webSocket.onerror = () => {
            console.error("Error when connecting on ws")
        }
    }
}

export default function* watcher() {
    yield takeEvery<IWebsocketAsyncAction>(CONNECTING, connectWorker)
}