import {combineReducers} from "redux";
import {CredentialReducer, credentialReducer} from "./credential/credential.reducers";
import {bookReducer,BooksReducers} from "./book/books.reducers"
import {RouterReducer, routerReducer} from "./history";

interface IRootReducer {
    credential: CredentialReducer,
    router: RouterReducer,
    books: BooksReducers
}

const reducers: IRootReducer = {
    credential: credentialReducer,
    router: routerReducer,
    books: bookReducer
};
export const rootReducers = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducers>;

export type RootStateKeys = keyof IRootReducer


