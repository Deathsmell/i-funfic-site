import React, {MouseEvent} from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {selectorUserId} from "../../store/credential/credential.selectors";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";
import {FormattedMessage} from "react-intl";

interface Params {
    authorId: number,
    bookId: number,
}

const BookManagerButtons: React.FC<Params> = ({authorId, bookId}) => {

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
            >
                <FormattedMessage id="book.manager.buttons.read"
                                  defaultMessage="Read"
                                  description="Read button"
                />
            </Button>
            {
                authorId === userId && (
                    <>
                        <Button variant="warning"
                                onClick={editHandler}
                        >
                            <FormattedMessage id="book.manager.buttons.edit"
                                              defaultMessage="Edit"
                                              description="Edit button"
                            />
                        </Button>
                        <Button variant="danger"
                                onClick={deleteHandler}
                        >
                            <FormattedMessage id="book.manager.buttons.delete"
                                              defaultMessage="Delete"
                                              description="Delete button"
                            />
                        </Button>
                        <Button variant="primary"
                                onClick={addHandler}
                        >
                            <FormattedMessage id="book.manager.buttons.add"
                                              defaultMessage="Add+"
                                              description="Add button"
                            />
                        </Button>
                    </>
                )
            }
        </Row>
    )
}

export default BookManagerButtons;