import React from 'react';
import {Route, Switch} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import FicPage from "./pages/FicPage";
import AuthPage from "./pages/AuthPage";

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path="/" component={MainPage} exact/>
            <Route path="/fic" component={FicPage}/>
            <Route path="/login" component={AuthPage}/>
            <Route path="/register" component={AuthPage}/>
        </Switch>
    )
}

export default Routes;
