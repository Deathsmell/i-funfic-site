import React, {useEffect, useState} from "react";
import {AxiosError} from "axios"
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/reducers";
import {getBooksByAuthorIdFetch, setMyBooks} from "../../store/book/books.actions";
import ProfilePage from "../ProfilePage";
import {UserApi} from "../../api";
import {IErrorResponse} from "../../../../interfaces/IResponse";
import {IUserFromDb} from "../../../../interfaces/IUser";

const mapProps = ({books: {myBook}, credential}: RootState) => ({myBook, credential})
const mapDispatch = {getBooksByAuthorId: getBooksByAuthorIdFetch}
const connector = connect(mapProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const SelfProfilePage: React.FC<PropsFromRedux> = ({
                                                       myBook,
                                                       credential,
                                                   }) => {

    const dispatch = useDispatch();
    const [user, setUser] = useState<IUserFromDb>();

    useEffect(function getCurrentUserInformation() {
        if (!user) {
            UserApi.getProfile(credential.id!).then(({data: {user, books}}) => {
                setUser(user)
                dispatch(setMyBooks(books))
            }).catch((e: AxiosError<IErrorResponse>) => {
                console.error(e.message)
            })
        }
    })

    if (user) {
        return (
            <ProfilePage myBook={myBook} user={user}/>
        )
    } else {
        return (
            <>
                Loading...
            </>
        )
    }
}

export default connector(SelfProfilePage);