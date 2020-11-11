import React, {useEffect, useState} from "react";
import ProfilePage from "../ProfilePage";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectorRoles} from "../../store/credential/credential.selectors";
import {AdminApi} from "../../api";
import {isAdmin} from "../../utils/adminUtils";
import {IUserFromDb} from "../../../../interfaces/IUser";
import {goBack} from "connected-react-router";
import {setMyBooks} from "../../store/book/books.actions";
import {selectorMyBooks} from "../../store/book/books.selectors";


const UserProfilePage: React.FC = () => {

    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>();
    const roles = useSelector(selectorRoles);
    const books = useSelector(selectorMyBooks());

    const [user, setUser] = useState<IUserFromDb>()

    useEffect(function getUsersProfileIfIAdmin () {
        if (id && isAdmin(roles)) {
            AdminApi.getUserProfile(Number(id)).then(({data}) => {
                dispatch(setMyBooks(data.books || []))
                setUser(data.user)
            }).catch(error => {
                console.error(error)
            })
        } else {
            dispatch(goBack())
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