import {createSelector} from "reselect";
import {RootState} from "../reducers";

const selectWS = (state: RootState) => state.websocket

export const selectorWebsocket = createSelector(
    selectWS,
    websocket => websocket
)