import React, {MouseEvent,useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {UserApi} from "../../api";
import {IUser} from "../../../../interfaces";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";

const UsersTable: React.FC = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState<IUser[]>();



    useEffect(function loadUserList() {
        if (!users) {
            UserApi.getAllUsers().then(({data}) => {
                if ("users" in data && data.users) {
                    setUsers(data.users)
                }
            }).catch(error => {
                console.error(error)
            })
        }
    },[])

    const profileHandler = (e: MouseEvent, id: number) => {
        e.preventDefault()
        dispatch(push(ApplicationDynamicMap.userProfilePage(id)))
    }

    return (
        <Table responsive striped bordered hover className="mt-4">
            <thead>
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Confirm</th>
                <th>Status</th>
                <th>Profile</th>
            </tr>
            </thead>
            <tbody>
            {
                users && users.map(({
                                        id,
                                        roles,
                                        username,
                                        confirm,
                                        blocked,
                                        email
                                    }) => {
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{username}</td>
                                <td>{email}</td>
                                <td>{roles?.map((role) => `"${role}" `)}</td>
                                <td>{confirm + ""}</td>
                                <td>{blocked ? "blocked" : "unblocked"}</td>
                                <td
                                >
                                    <a href="#"
                                       onClick={e => profileHandler(e,id!)}
                                    >
                                        @link
                                    </a>
                                </td>
                            </tr>
                        )
                    }
                )
            }
            </tbody>
        </Table>
    )
}

export default UsersTable;