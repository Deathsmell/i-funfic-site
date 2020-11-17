import React, {MouseEvent, useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {UserApi} from "../../api";
import {IUser} from "../../../../interfaces";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";
import {FormattedMessage} from "react-intl";

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
    }, [])

    const profileHandler = (e: MouseEvent, id: number) => {
        e.preventDefault()
        dispatch(push(ApplicationDynamicMap.userProfilePage(id)))
    }

    return (
        <Table responsive striped bordered hover className="mt-4">
            <thead>
            <tr>
                <th>
                    <FormattedMessage id="usertable.header.id"
                                      defaultMessage="Id"
                                      description="User table id cell"
                    />
                </th>
                <th>
                    <FormattedMessage id="usertable.header.username"
                                      defaultMessage="username"
                                      description="User table username cell"
                    />
                </th>
                <th>
                    <FormattedMessage id="usertable.header.email"
                                      defaultMessage="Email"
                                      description="User table email cell"
                    />
                </th>
                <th>
                    <FormattedMessage id="usertable.header.roles"
                                      defaultMessage="Roles"
                                      description="User table roles cell"
                    />
                </th>
                <th>
                    <FormattedMessage id="usertable.header.confirm"
                                      defaultMessage="Confirm"
                                      description="User table confirm cell"
                    />
                </th>
                <th>
                    <FormattedMessage id="usertable.header.status"
                                      defaultMessage="Status"
                                      description="User table status cell"
                    />
                </th>
                <th>
                    <FormattedMessage id="usertable.header.profile"
                                      defaultMessage="Profile"
                                      description="User table profile cell"
                    />
                </th>
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
                                <td>{
                                    blocked
                                        ? (
                                            <FormattedMessage id="usertable.blocked"
                                                              defaultMessage="blocked"
                                                              description="Blocked status cell"
                                            />
                                        )
                                        : (
                                            <FormattedMessage id="usertable.unblocked"
                                                              defaultMessage="unblocked"
                                                              description="Unblocked status cell"
                                            />
                                        )
                                }</td>
                                <td
                                >
                                    <a href="#"
                                       onClick={e => profileHandler(e, id!)}
                                    >
                                        <FormattedMessage id="usertable.link"
                                                          defaultMessage="@profile"
                                                          description="Profile link"
                                        />
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