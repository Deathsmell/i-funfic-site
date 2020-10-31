import {combineReducers} from "redux";
import {registrationReducer} from "./auth/reducers";
import {requestsReducer} from "./request"
export const reducers = combineReducers({
    register: registrationReducer,
    request: requestsReducer
});

export type RootState = ReturnType<typeof reducers>;