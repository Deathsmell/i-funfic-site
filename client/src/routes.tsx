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
import EditBookPage from "./pages/EditBookPage";
import CreateChapterPage from "./pages/CreateChapterPage";

export const ApplicationMap = {
    MAIN_PAGE: "/",
    LOGIN_PAGE: "/login",
    REGISTER_PAGE: "/register",
    BOOK_PAGE: "/book/view/:id",
    USERS_PAGE: "/users",
    PROFILE_PAGE: "/profile",
    CREATE_BOOK_PAGE: "/book/create",
    EDIT_BOOK_PAGE: "/book/edit/:id",
    READ_BOOK_PAGE: "/book/read/:id",
    CREATE_CHAPTER_PAGE: "/chapter/create/:id",
    EDIT_CHAPTER_PAGE: "/chapter/edit/:id",
}

export const createPath = (path: string) => (id: number | string) => path.replace(/:id$/,String(id))

export const ApplicationDynamicMap = {
    bookPage: (id: number | string): string => createPath(ApplicationMap.BOOK_PAGE)(id),
    readBookPage: (id: number | string): string => createPath(ApplicationMap.READ_BOOK_PAGE)(id),
    editBookPage: (id: number | string): string => createPath(ApplicationMap.EDIT_BOOK_PAGE)(id),
    createChapterPage: (id: number | string): string => createPath(ApplicationMap.CREATE_CHAPTER_PAGE)(id),
    editChapterPage: (id: number | string): string => createPath(ApplicationMap.EDIT_CHAPTER_PAGE)(id),
}

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path={ApplicationMap.MAIN_PAGE} component={MainPage} exact/>
            <Route path={ApplicationMap.LOGIN_PAGE} component={AuthPage}/>
            <Route path={ApplicationMap.REGISTER_PAGE} component={AuthPage}/>
            <Route path={ApplicationMap.BOOK_PAGE} component={BookPage} exact/>
            <Route path={ApplicationMap.READ_BOOK_PAGE} component={ReadBookPage} exact/>
            <Route path={ApplicationMap.PROFILE_PAGE} component={ProfilePage} exact/>
            <Route path={ApplicationMap.USERS_PAGE} component={UsersManagePage} exact/>
            <Route path={ApplicationMap.CREATE_BOOK_PAGE} component={CreateBookPage} exact/>
            <Route path={ApplicationMap.EDIT_BOOK_PAGE} component={EditBookPage} exact/>
            <Route path={ApplicationMap.CREATE_CHAPTER_PAGE} component={CreateChapterPage} exact/>
            <Route path={ApplicationMap.EDIT_CHAPTER_PAGE} component={EditChapterPage} exact/>
        </Switch>
    )
}

export default Routes;
