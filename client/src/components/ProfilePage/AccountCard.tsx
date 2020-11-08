import React, {MouseEvent, useEffect, useState} from "react";
import {AiOutlineUser} from "react-icons/ai";
import {Button, ButtonGroup} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {logout} from "../../store/credential/credential.actions";
import {push} from "connected-react-router";
import {ApplicationMap} from "../../routes";
import {IUser} from "../../../../interfaces";
import {AdminApi} from "../../api";


interface Props {
    isAdmin: boolean,
    user?: IUser
}

const AccountCard: React.FC<Props> = ({
                                          isAdmin,
                                          user
                                      }) => {


    const dispatch = useDispatch();
    const [blocked, setBlocked] = useState<boolean>();

    useEffect(() => {
        if (user && user.blocked){
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
        console.log("blocking", user)
        if (!blocked) {
            AdminApi.blockUser(user?.id!).then(() => {
                setBlocked(true)
            }).catch(e => {
                console.error(e)
            })
        }
        if (blocked){
            AdminApi.unblockUser(user?.id!).then(() => {
                setBlocked(false)
            }).catch(e => {
                console.error(e)
            })
        }

    }

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
                {isAdmin && user && (
                    <>
                        <Button variant="warning"
                                onClick={blockHandler}
                        >{blocked ? "unblock" : "block"}</Button>
                    </>
                )
                }
                {
                    !user && (
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