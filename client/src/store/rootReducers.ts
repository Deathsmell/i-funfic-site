import {combineReducers} from "redux";
import {AuthFieldsReducer, authFieldsReducer, AuthReducer, authReducer} from "./auth/reducers";
import {RouterReducer, routerReducer} from "./history";

interface RootReducers {
    register: AuthFieldsReducer,
    auth: AuthReducer,
    router: RouterReducer,
}

const reducers: RootReducers = {
    register: authFieldsReducer,
    auth: authReducer,
    router: routerReducer,
};
export const rootReducers = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducers>;

export type RootStateKeys = keyof RootReducers


