import React from 'react';
import { Route, Switch } from 'react-router'
import MainPage from "./pages/MainPage";
import BookPage from "./pages/BookPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import UsersManagePage from "./pages/UsersManagePage";
import CreateBookPage from "./pages/CreateBookPage";
import EditChapterPage from "./pages/EditChapterPage";
import ReadBookPage from "./pages/ReadBookPage";

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path="/" component={MainPage} exact/>
            <Route path="/login" component={AuthPage}/>
            <Route path="/register" component={AuthPage}/>
            <Route path="/book/:id" component={BookPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/users" component={UsersManagePage}/>
            <Route path="/create" component={CreateBookPage}/>
            <Route path="/edit/:id" component={EditChapterPage}/>
            <Route path="/read" component={ReadBookPage}/>
        </Switch>
    )
}

export default Routes;
