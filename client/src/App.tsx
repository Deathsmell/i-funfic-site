import React, {useEffect} from 'react';
import {ConnectedRouter} from "connected-react-router";
import {history} from "./store/router/history";
import NavBar from './components/NavBar';
import Routes from "./routes";
import {checkAuth} from "./store/credential/credential.actions";
import {useDispatch, useSelector} from "react-redux";
import {connecting} from "./store/websocket/websocket.actions";
import {selectorAuthorise} from "./store/credential/credential.selectors";
import {selectorWebsocket} from "./store/websocket/websocket.selector";

const App: React.FC = () => {


    const dispatch = useDispatch();
    const authorise = useSelector(selectorAuthorise);
    const ws = useSelector(selectorWebsocket)

    useEffect(() => {
        dispatch(checkAuth())
        if (authorise && !ws){
            dispatch(connecting())
        }
    },[authorise, ws])

    return (
        <>
                <ConnectedRouter history={history}>
                    <NavBar/>
                    <Routes/>
                </ConnectedRouter>
        </>
    );
}

export default App;
