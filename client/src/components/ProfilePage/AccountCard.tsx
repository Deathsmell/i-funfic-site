import React, {MouseEvent, useState} from "react";
import {AiOutlineUser} from "react-icons/ai";
import {Button, ButtonGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/credential/credential.actions";
import {push} from "connected-react-router";
import {ApplicationDynamicMap, ApplicationMap} from "../../routes";
import {AdminApi} from "../../api";
import {selectorRoles, selectorUserId} from "../../store/credential/credential.selectors";
import {isAdmin} from "../../utils/adminUtils";
import {IUserFromDb} from "../../../../interfaces/IUser";
import DropImage from "../DropImage";
import {useParams} from "react-router";


interface Props {
    user: IUserFromDb
}


const AccountCard: React.FC<Props> = ({
                                          user
                                      }) => {

    const {id} = useParams() as { id: string | undefined };
    const dispatch = useDispatch();
    const [blocked, setBlocked] = useState<boolean>(user.blocked);
    const [admin, setAdmin] = useState<boolean>(isAdmin(user.roles));
    const [image, setImage] = useState<string | undefined>(user.image)
    const roles = useSelector(selectorRoles);
    const userId = useSelector(selectorUserId);

    const logoutHandler = (event: MouseEvent) => {
        event.preventDefault()
        dispatch(logout())
    }

    const createBookHandler = (event: MouseEvent) => {
        event.preventDefault()
        dispatch(push(
            id
                ? ApplicationDynamicMap.adminCreatePage(id)
                : ApplicationMap.CREATE_BOOK_PAGE
        ))
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
            <DropImage setImage={setImage}
                       image={image}
                       component={
                           <div className="border border-dark"
                                style={{backgroundColor: 'grey'}}
                           >
                               <AiOutlineUser size={"auto"} color="white"/>
                           </div>
                       }
            />
            <hr/>
            <h1 className="text-center">{user.username}</h1>
            <ButtonGroup vertical className="w-100 mb-4">
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