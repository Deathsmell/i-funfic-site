import {applyMiddleware, createStore, Middleware} from "redux"
// import createSagaMiddleware from "redux-saga"
import logger from "redux-logger";
import {reducers} from "./reducers";
import {requestsMiddleware} from "./request";

// const saga = createSagaMiddleware()

const isProduction = process.env.NODE_ENV === "production"

let middleware:Middleware[]  = [];

if (!isProduction) {
    middleware = [...middleware,logger]
}

const store  = createStore(reducers, applyMiddleware(...middleware,...requestsMiddleware))

export default store