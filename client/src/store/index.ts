import {applyMiddleware, createStore, Middleware} from "redux"
import createSagaMiddleware from "redux-saga"
import logger from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension"
import {reducers} from "./reducers";
import {requestsMiddleware} from "./request";
import {routerMiddleware} from "./history";
import rootSaga from "../saga";


const sagaMiddleware = createSagaMiddleware()

const isProduction = process.env.NODE_ENV === "production"

let middleware:Middleware[]  = [...requestsMiddleware,routerMiddleware,sagaMiddleware];

if (!isProduction) {
    middleware = [...middleware,logger]
}

const store  = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)))

sagaMiddleware.run(rootSaga)


export default store