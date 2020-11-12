import {CONNECTING, SET_WEBSOCKET} from "./websocket.constants";

export type WebsocketState = WebSocket | null

export interface IWebsocketAction {
    type: typeof SET_WEBSOCKET,
    ws: WebSocket
}

export interface IWebsocketAsyncAction {
    type: typeof CONNECTING,
}
