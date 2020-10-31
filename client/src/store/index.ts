import {applyMiddleware, createStore, Middleware} from "redux"
// import createSagaMiddleware from "redux-saga"
import logger from "redux-logger";
import {reducers} from "./reducers";
import {requestsMiddleware} from "./request";
import {routerMiddleware} from "./history";

// const saga = createSagaMiddleware()

const isProduction = process.env.NODE_ENV === "production"

let middleware:Middleware[]  = [...requestsMiddleware,routerMiddleware,];

if (!isProduction) {
    middleware = [...middleware,logger]
}

const store  = createStore(reducers, applyMiddleware(...middleware))



export default store