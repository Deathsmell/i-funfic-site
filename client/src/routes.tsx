import React from 'react';
import {Route, Switch} from 'react-router'
import MainPage from "./pages/common/MainPage";
import BookPage from "./pages/common/BookPage";
import AuthPage from "./pages/common/AuthPage";
import AdminManagePage from "./pages/admin/AdminManagePage";
import CreateBookPage from "./pages/authorised/CreateBookPage";
import EditChapterPage from "./pages/authorised/EditChapterPage";
import ReadChaptersPage from "./pages/common/ReadChaptersPage";
import EditBookPage from "./pages/authorised/EditBookPage";
import CreateChapterPage from "./pages/authorised/CreateChapterPage";
import UserProfilePage from "./pages/admin/UserProfilePage";
import SelfProfilePage from "./pages/authorised/SelfProfilePage";
import {useSelector} from "react-redux";
import {selectorAuthorise, selectorRoles} from "./store/credential/credential.selectors";
import {isAdmin} from "./utils/adminUtils";

export const ApplicationMap = {
    MAIN_PAGE: "/",
    LOGIN_PAGE: "/login",
    REGISTER_PAGE: "/register",
    BOOK_PAGE: "/book/view/:id",
    USERS_PAGE: "/users",
    PROFILE_PAGE: "/profile",
    USER_PROFILE_PAGE: "/user/:id",
    CREATE_BOOK_PAGE: "/book/create",
    EDIT_BOOK_PAGE: "/book/edit/:id",
    READ_BOOK_PAGE: "/book/read/:id",
    CREATE_CHAPTER_PAGE: "/chapter/create/:id",
    EDIT_CHAPTER_PAGE: "/chapter/edit/:id",
}

export const createPath = (path: string) => (id: number | string) => path.replace(/:id$/, String(id))

export const ApplicationDynamicMap = {
    bookPage: (id: number | string): string => createPath(ApplicationMap.BOOK_PAGE)(id),
    readBookPage: (id: number | string): string => createPath(ApplicationMap.READ_BOOK_PAGE)(id),
    editBookPage: (id: number | string): string => createPath(ApplicationMap.EDIT_BOOK_PAGE)(id),
    createChapterPage: (id: number | string): string => createPath(ApplicationMap.CREATE_CHAPTER_PAGE)(id),
    editChapterPage: (id: number | string): string => createPath(ApplicationMap.EDIT_CHAPTER_PAGE)(id),
    userProfilePage: (id: number | string): string => createPath(ApplicationMap.USER_PROFILE_PAGE)(id),
}

const Routes: React.FC = () => {


    const authorise = useSelector(selectorAuthorise);
    const roles = useSelector(selectorRoles);
    return (
        <Switch>
            <Route path={ApplicationMap.MAIN_PAGE} component={MainPage} exact/>
            <Route path={ApplicationMap.LOGIN_PAGE} component={AuthPage}/>
            <Route path={ApplicationMap.REGISTER_PAGE} component={AuthPage}/>
            <Route path={ApplicationMap.BOOK_PAGE} component={BookPage} exact/>
            <Route path={ApplicationMap.READ_BOOK_PAGE} component={ReadChaptersPage} exact/>
            {
                authorise && (
                    <>
                        <Route path={ApplicationMap.PROFILE_PAGE} component={SelfProfilePage} exact/>
                        <Route path={ApplicationMap.CREATE_BOOK_PAGE} component={CreateBookPage} exact/>
                        <Route path={ApplicationMap.EDIT_BOOK_PAGE} component={EditBookPage} exact/>
                        <Route path={ApplicationMap.CREATE_CHAPTER_PAGE} component={CreateChapterPage} exact/>
                        <Route path={ApplicationMap.EDIT_CHAPTER_PAGE} component={EditChapterPage} exact/>
                    </>
                )
            }
            {
                authorise && isAdmin(roles) && (
                    <>
                        <Route path={ApplicationMap.USER_PROFILE_PAGE} component={UserProfilePage}/>
                        <Route path={ApplicationMap.USERS_PAGE} component={AdminManagePage} exact/>
                    </>
                )
            }


        </Switch>
    )
}

export default Routes;
