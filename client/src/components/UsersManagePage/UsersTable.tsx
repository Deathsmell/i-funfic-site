import React from "react";
import {Table} from "react-bootstrap";

const UsersTable: React.FC = () => {


    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Books</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Deathsmell</td>
                    <td>deathsmell@gmai.com</td>
                    <td>Admin, User</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default UsersTable;