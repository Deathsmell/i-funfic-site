import {IWebsocketAction, IWebsocketAsyncAction} from "./websocket.interfaces";
import {CONNECTING, SET_WEBSOCKET} from "./websocket.constants";


export const connecting = (): IWebsocketAsyncAction => ({
    type: CONNECTING
})

export const setConnection = (ws: WebSocket) : IWebsocketAction => ({
    type: SET_WEBSOCKET,
    ws: ws
})
