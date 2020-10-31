import createBrowserHistory from "history/createBrowserHistory";
import { connectRouter } from 'connected-react-router'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()
export const routerReducer = connectRouter(history)
export const routerMiddleware = createRouterMiddleware(history)
