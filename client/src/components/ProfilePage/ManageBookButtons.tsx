import React, {MouseEvent} from "react";
import {Button, ButtonGroup, ButtonToolbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import {MdChromeReaderMode, MdDeleteForever, MdModeEdit} from "react-icons/md";
import {useDispatch} from "react-redux";
import {deleteBookFetch} from "../../store/book/books.actions";

interface Prop {
    id: number
}

const ManageBookButtons: React.FC<Prop> = ({id}) => {

    const dispatch = useDispatch();

    const readHandler = (e: MouseEvent) => {
        e.preventDefault()
        console.log("Read book " + id)
    }

    const editHandler = (e: MouseEvent) => {
        e.preventDefault()
        console.log("Edit book " + id)

    }

    const deleteHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(deleteBookFetch(id))
    }

    return (
        <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="" aria-label="First group">
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-read`}
                                 onClick={readHandler}
                        >
                            Read
                        </Tooltip>
                    }
                >
                    <Button variant="outline-info">
                        <MdChromeReaderMode size="25px" color="black"/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-edit`}
                                 onClick={editHandler}
                        >
                            Edit
                        </Tooltip>
                    }
                >
                    <Button variant="outline-warning">
                        <MdModeEdit size="25px" color="black"/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-delete`}
                        >
                            Delete
                        </Tooltip>
                    }
                >
                    <Button variant="outline-danger"
                            onClick={deleteHandler}
                    >
                        <MdDeleteForever size="25px" color="black"/>
                    </Button>
                </OverlayTrigger>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

export default ManageBookButtons;