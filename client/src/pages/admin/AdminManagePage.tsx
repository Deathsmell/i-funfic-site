import React from "react";
import UsersTable from "../../components/UsersManagePage/UsersTable";
import {Container} from "react-bootstrap";

const AdminManagePage: React.FC = () =>{

    return (
        <Container>
            <UsersTable/>
        </Container>
    )
}

export default AdminManagePage;