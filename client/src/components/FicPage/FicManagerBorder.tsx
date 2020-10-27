import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const FicManagerBorder: React.FC = () => {

    return (
        <Row className="manager-border justify-content-center mt-2">
            <Button variant="success">Read</Button>
            <Button variant="warning">Edit</Button>
            <Button variant="danger">Delete</Button>
            <Button variant="primary">Add</Button>
        </Row>
    )
}

export default FicManagerBorder;