import {combineReducers} from "redux";
import {CredentialReducer, credentialReducer} from "./credential/credential.reducers";
import {bookReducer, BooksReducers} from "./book/books.reducers"
import {ChapterReducer, chaptersReducer} from "./chapters/chapters.reducers"
import {RouterReducer, routerReducer} from "./router/history";
import {CommentsReducer, commentsReducers} from "./comments/comments.reducers";
import {WebsocketReducer, websocketReducer} from "./websocket/websocket.reducer"
import {LocaleReducer, localeReducer} from "./locale/locale.reducer"
import {GenresReducer,genresReducer} from "./genres/genres.reducer"

interface IRootReducer {
    credential: CredentialReducer,
    router: RouterReducer,
    books: BooksReducers,
    chapters: ChapterReducer,
    comments: CommentsReducer,
    websocket: WebsocketReducer,
    locale: LocaleReducer,
    genres: GenresReducer
}

const reducers: IRootReducer = {
    credential: credentialReducer,
    router: routerReducer,
    books: bookReducer,
    chapters: chaptersReducer,
    comments: commentsReducers,
    websocket: websocketReducer,
    locale: localeReducer,
    genres: genresReducer,
};
export const rootReducers = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducers>;

export type RootStateKeys = keyof IRootReducer


