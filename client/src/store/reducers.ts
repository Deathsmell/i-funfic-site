import {combineReducers} from "redux";
import {registrationReducer} from "./auth/reducers";
import {requestsReducer} from "./request"
import {routerReducer} from "./history";

export const reducers = combineReducers({
    register: registrationReducer,
    request: requestsReducer,
    router: routerReducer,
});

export type RootState = ReturnType<typeof reducers>;