import React from 'react';
import {ConnectedRouter} from "connected-react-router";
import {history} from "./store/router/history";
import NavBar from './components/NavBar';
import Routes from "./routes";
import {useFetching} from "./hooks/useFetching";
import {checkAuth} from "./store/credential/credential.actions";

const App: React.FC = () => {

    useFetching(checkAuth)

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
