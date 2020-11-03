import React from 'react';
import { Route, Switch } from 'react-router'
import MainPage from "./pages/MainPage";
import FicPage from "./pages/FicPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import UsersManagePage from "./pages/UsersManagePage";
import CreateBookPage from "./pages/CreateBookPage";
import EditChapterPage from "./pages/EditChapterPage";

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path="/" component={MainPage} exact/>
            <Route path="/login" component={AuthPage}/>
            <Route path="/register" component={AuthPage}/>
            <Route path="/fic" component={FicPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/users" component={UsersManagePage}/>
            <Route path="/create" component={CreateBookPage}/>
            <Route path="/edit" component={EditChapterPage}/>
        </Switch>
    )
}

export default Routes;
