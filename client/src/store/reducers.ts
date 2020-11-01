import {combineReducers} from "redux";
import {authFieldsReducer,AuthReducer} from "./auth/reducers";
import {requestsReducer} from "./request"
import {routerReducer} from "./history";

export const reducers = combineReducers({
    register: authFieldsReducer,
    auth: AuthReducer,
    request: requestsReducer,
    router: routerReducer,
});

export type RootState = ReturnType<typeof reducers>;