import React from 'react';
import {ConnectedRouter} from "connected-react-router";
import {history} from "./store/router/history";
import NavBar from './components/NavBar';
import Routes from "./routes";

const App: React.FC = () => {

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
