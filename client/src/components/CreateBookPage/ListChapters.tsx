import React from "react";
import {Container, Table} from "react-bootstrap";

const ListChapters = () => {
    
    
    return (
        <Container className={"mt-5"}>
            <Table
                   bordered
                   hover
            >
                <thead>
                <tr>
                    <th className={"col-1"}>#</th>
                    <th className={"col-6"}>Chapter name</th>
                    <th>Last update</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>1 minute ago</td>
                    <td>@action</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>1 month ago</td>
                    <td>@action</td>
                </tr>
                <tr>
                    <td colSpan={4}
                        className={"text-center"}
                    >Add new chapter</td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default ListChapters