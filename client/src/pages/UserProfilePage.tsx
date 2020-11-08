import React, {useEffect, useState} from "react";
import ProfilePage from "./ProfilePage";
import {useParams} from "react-router";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {selectorRoles} from "../store/credential/credential.selectors";
import {IBook, IUser, Roles} from "../../../interfaces";
import {AdminApi} from "../api";
import {RootState} from "../store/reducers";
import {getBooksByAuthorIdFetch} from "../store/book/books.actions";

const mapProps = ({credential}: RootState) => ({credential: credential})
const mapDispatch = {getBooksByAuthorId: getBooksByAuthorIdFetch}
const connector = connect(mapProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
const isAdmin = (roles?:Roles[]):boolean => roles?.includes("ADMIN" as Roles) || false;


const UserProfilePage: React.FC<PropsFromRedux> = ({credential}) => {

    const {id} = useParams<{ id: string }>();
    const roles = useSelector(selectorRoles);

    const [books, setBooks] = useState<IBook[]>([]);
    const [user, setUser] = useState<IUser>()

    useEffect(function () {
        if (id && isAdmin(roles)) {
            AdminApi.getUserProfile(Number(id)).then(({data}) => {
                setBooks(data.books || [])
                setUser(data.user)
            }).catch(error => {
                console.error(error)
            })
        }
    }, [])

    return(
        <ProfilePage credential={credential} myBook={books} user={user}/>
    )
}

export default connector(UserProfilePage)