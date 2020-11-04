import {applyMiddleware, createStore, Middleware, Store} from "redux"
import {PersistConfig, persistReducer, persistStore, Transform} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createCompressor from 'redux-persist-transform-compress'
import createSagaMiddleware from "redux-saga"
import logger from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension"
import {rootReducers, RootState, RootStateKeys} from "./reducers";
import {routerMiddleware} from "./history";
import rootSaga from "./saga";
import {isProduction} from "@config/constants";

const sagaMiddleware = createSagaMiddleware()

let middleware:Middleware[]  = [routerMiddleware,sagaMiddleware];

if (!isProduction) {
    middleware = [...middleware,logger]
}


const blacklist: RootStateKeys[] = []
let transforms: Transform<any, any>[] = []
if (isProduction) {
    const compressor = createCompressor({blacklist});
    transforms = [compressor]
}

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    blacklist,
    debug: !isProduction,
    transforms
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store:Store  = createStore(persistedReducer, {},composeWithDevTools(applyMiddleware(...middleware)))
sagaMiddleware.run(rootSaga)
const persistor = persistStore(store)


export {
    store,
    persistor
}