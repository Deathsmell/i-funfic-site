import React, {MouseEvent, useEffect, useState} from "react";
import {AiOutlineUser} from "react-icons/ai";
import {Button, ButtonGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/credential/credential.actions";
import {push} from "connected-react-router";
import {ApplicationMap} from "../../routes";
import {IUser} from "../../../../interfaces";
import {AdminApi} from "../../api";
import {selectorRoles, selectorUserId} from "../../store/credential/credential.selectors";
import {isAdmin} from "../../utils/adminUtils";


interface Props {
    user: IUser
}


const AccountCard: React.FC<Props> = ({
                                          user
                                      }) => {


    const dispatch = useDispatch();
    const [blocked, setBlocked] = useState<boolean>();
    const [admin, setAdmin] = useState<boolean>(isAdmin(user.roles));
    const roles = useSelector(selectorRoles);
    const userId = useSelector(selectorUserId);

    useEffect(() => {
        if (user && user.blocked) {
            setBlocked(user.blocked)
        }
    })


    const logoutHandler = (event: MouseEvent) => {
        event.preventDefault()
        dispatch(logout())
    }

    const createBookHandler = (event: MouseEvent) => {
        event.preventDefault()
        dispatch(push(ApplicationMap.CREATE_BOOK_PAGE))
    }

    const blockHandler = (e: MouseEvent) => {
        e.preventDefault()
        if (!blocked) {
            AdminApi.blockUser(user?.id!).then(() => {
                setBlocked(true)
            }).catch(e => {
                console.error(e)
            })
        }
        if (blocked) {
            AdminApi.unblockUser(user?.id!).then(() => {
                setBlocked(false)
            }).catch(e => {
                console.error(e)
            })
        }
    }

    const adminHandler = (e: MouseEvent) => {
        e.preventDefault()
        if (!admin) {
            AdminApi.setAdminRole(user?.id!).then(() => {
                setAdmin(true)
            }).catch(e => {
                console.error(e)
            })
        } else {
            AdminApi.removeAdminRole(user?.id!).then(() => {
                setAdmin(false)
            }).catch(e => {
                console.error(e)
            })
        }
    }

    const currentUser = user.id === userId;
    return (
        <div>
            <div className="border border-dark "
                 style={{width: '15em', height: '15em', backgroundColor: 'grey'}}
            >
                <AiOutlineUser size="15em" color="white"/>
            </div>
            <hr/>
            <h1 className="text-center">Username</h1>
            <ButtonGroup vertical className="w-100">
                <Button variant="dark"
                        onClick={createBookHandler}
                >Create new book</Button>
                {isAdmin(roles) && user && (
                    <>
                        <Button variant="warning"
                                onClick={blockHandler}
                        >{blocked ? "unblock" : "block"}</Button>
                        <Button variant="warning"
                                onClick={adminHandler}
                        >{admin ? "Remove admin" : "Give admin"}</Button>
                    </>
                )
                }
                {
                    currentUser && (
                        <Button variant="danger"
                                onClick={logoutHandler}
                        >Log out</Button>
                    )
                }
            </ButtonGroup>
        </div>
    )
}

export default AccountCard;