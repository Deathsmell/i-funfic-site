import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import {selectorUserId} from "../../store/credential/credential.selectors";

interface Params {
    authorId: number,
    bookId: number,
}

const BookManagerBorder: React.FC<Params> = ({authorId, bookId}) => {

    const userId = useSelector(selectorUserId);

    return (
        <Row className="manager-border justify-content-center mt-2">
            <Button variant="success">Read</Button>
            {
                authorId === userId && (
                    <>
                        <Button variant="warning">Edit</Button>
                        <Button variant="danger">Delete</Button>
                        <Button variant="primary">Add</Button>
                    </>
                )
            }
        </Row>
    )
}

export default BookManagerBorder;