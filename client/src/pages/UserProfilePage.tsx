import React, {useEffect, useState} from "react";
import ProfilePage from "./ProfilePage";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectorRoles} from "../store/credential/credential.selectors";
import {IBook, IUser} from "../../../interfaces";
import {AdminApi} from "../api";
import {isAdmin} from "../utils/adminUtils";


const UserProfilePage: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const roles = useSelector(selectorRoles);

    const [books, setBooks] = useState<IBook[]>([]);
    const [user, setUser] = useState<IUser>()

    useEffect(function getUsersProfileIfIAdmin () {
        if (id && isAdmin(roles)) {
            AdminApi.getUserProfile(Number(id)).then(({data}) => {
                setBooks(data.books || [])
                setUser(data.user)
            }).catch(error => {
                console.error(error)
            })
        }
    }, [])

    if (user) {
        return(
            <ProfilePage myBook={books} user={user}/>
        )
    } else {
        return (
            <>Loading...</>
        )
    }
}

export default UserProfilePage