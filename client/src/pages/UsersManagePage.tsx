import React from "react";
import UsersTable from "../components/UsersManagePage/UsersTable";
import {Container} from "react-bootstrap";

const UsersManagePage: React.FC = () =>{

    return (
        <Container>
            <UsersTable/>
        </Container>
    )
}

export default UsersManagePage;