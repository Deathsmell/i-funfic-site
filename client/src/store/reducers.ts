import {combineReducers} from "redux";
import {authFieldsReducer,AuthReducer} from "./auth/reducers";
import {routerReducer} from "./history";

export const reducers = combineReducers({
    register: authFieldsReducer,
    auth: AuthReducer,
    router: routerReducer,
});

export type RootState = ReturnType<typeof reducers>;