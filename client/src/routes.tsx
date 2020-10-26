import React from 'react';
import {Route, Switch} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import FicPage from "./pages/FicPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path="/" component={MainPage} exact/>
            <Route path="/login" component={AuthPage}/>
            <Route path="/register" component={AuthPage}/>
            <Route path="/fic" component={FicPage}/>
            <Route path="/profile" component={ProfilePage}/>
        </Switch>
    )
}

export default Routes;
