import React, {MouseEvent} from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {selectorUserId} from "../../store/credential/credential.selectors";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";

interface Params {
    authorId: number,
    bookId: number,
}

const BookManagerBorder: React.FC<Params> = ({authorId, bookId}) => {

    const dispatch = useDispatch();
    const userId = useSelector(selectorUserId);

    const reedHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(push(ApplicationDynamicMap.readBookPage(bookId)))
    }

    const editHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(push(ApplicationDynamicMap.editBookPage(bookId)))
    }

    const deleteHandler = (e: MouseEvent) => {
        e.preventDefault()
        console.log("Create confirm modal windows. If user say yes delete book")
        // dispatch(deleteBookFetch(bookId))
    }

    const addHandler = (e: MouseEvent) => {
        e.preventDefault()
        console.log("Create new chapter")
    }

    return (
        <Row className="manager-border justify-content-center mt-4">
            <Button variant="success"
                    onClick={reedHandler}
            >Read</Button>
            {
                authorId === userId && (
                    <>
                        <Button variant="warning"
                                onClick={editHandler}
                        >Edit</Button>
                        <Button variant="danger"
                                onClick={deleteHandler}
                        >Delete</Button>
                        <Button variant="primary"
                                onClick={addHandler}
                        >Add</Button>
                    </>
                )
            }
        </Row>
    )
}

export default BookManagerBorder;