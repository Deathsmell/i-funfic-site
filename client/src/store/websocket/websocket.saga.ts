import {put, select, takeEvery} from "redux-saga/effects"
import {IWebsocketAction, IWebsocketAsyncAction} from "./websocket.interfaces";
import {CONNECTING} from "./websocket.constants";
import {selectorWebsocket} from "./websocket.selector";
import {setConnection} from "./websocket.actions";
import {BASE_URL} from "@api";
import isProduction from "../../utils/isProduction";


function* connectWorker() {
    const ws = yield select(selectorWebsocket);
    if (!ws) {
        const url = BASE_URL.replace(/^http(s?)/, isProduction ? "wss" : "ws");
        const webSocket = new WebSocket(url)
        yield put<IWebsocketAction>(setConnection(webSocket))
        webSocket.onerror = () => {
            console.error("Error when connecting on ws")
        }
    }
}

export default function* watcher() {
    yield takeEvery<IWebsocketAsyncAction>(CONNECTING, connectWorker)
}