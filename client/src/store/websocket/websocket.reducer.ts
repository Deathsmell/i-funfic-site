import {SET_WEBSOCKET} from "./websocket.constants";
import {IWebsocketAction, WebsocketState} from "./websocket.interfaces";

const initialValue: WebsocketState = null

export const websocketReducer = (
    state: WebsocketState = initialValue,
    action: IWebsocketAction,
) => {
    switch (action.type){
        case SET_WEBSOCKET:
            return action.ws
        default: return state
    }
}

export type WebsocketReducer = typeof websocketReducer