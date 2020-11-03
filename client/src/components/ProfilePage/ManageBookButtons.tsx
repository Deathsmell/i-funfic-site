import React, {MouseEvent} from "react";
import {Button, ButtonGroup, ButtonToolbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import {MdChromeReaderMode, MdDeleteForever, MdModeEdit} from "react-icons/md";


const ManageBookButtons: React.FC = () => {


    const readHandler = (e: MouseEvent) => {
        e.preventDefault()
    }

    const editHandler = (e: MouseEvent) => {
        e.preventDefault()
    }

    const deleteHandler = (e: MouseEvent) => {
        e.preventDefault()
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
                                 onClick={deleteHandler}
                        >
                            Delete
                        </Tooltip>
                    }
                >
                <Button variant="outline-danger">
                    <MdDeleteForever size="25px" color="black"/>
                </Button>
                </OverlayTrigger>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

export default ManageBookButtons;