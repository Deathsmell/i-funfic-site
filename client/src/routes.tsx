import React from 'react';
import {Route, Switch} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import FicPage from "./pages/FicPage";

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path="/" component={MainPage} exact/>
            <Route path="/fic" component={FicPage}/>
        </Switch>
    )
}

export default Routes;
