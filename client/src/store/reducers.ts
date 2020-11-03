import {combineReducers} from "redux";
import {AuthFieldsReducer, authFieldsReducer, AuthReducer, authReducer} from "./auth/reducers";
import {bookReducer,BooksReducers} from "./book/books.reducers"
import {RouterReducer, routerReducer} from "./history";

interface IRootReducer {
    registerFields: AuthFieldsReducer,
    credential: AuthReducer,
    router: RouterReducer,
    books: BooksReducers
}

const reducers: IRootReducer = {
    registerFields: authFieldsReducer,
    credential: authReducer,
    router: routerReducer,
    books: bookReducer
};
export const rootReducers = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducers>;

export type RootStateKeys = keyof IRootReducer


