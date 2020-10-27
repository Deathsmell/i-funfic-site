import React from "react";
import {Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import {MdModeEdit,MdDeleteForever,MdChromeReaderMode} from "react-icons/md";


const ManageBookButtons: React.FC = () => {


    return (
        <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="" aria-label="First group">
                <Button variant="outline-info">
                    <MdChromeReaderMode size="25px" color="black"/>
                </Button>
                <Button variant="outline-warning">
                    <MdModeEdit size="25px" color="black"/>
                </Button>
                <Button variant="outline-danger">
                    <MdDeleteForever size="25px" color="black"/>
                </Button>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

export default ManageBookButtons;