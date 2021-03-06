import React, {MouseEvent} from "react";
import {Button, ButtonGroup, ButtonToolbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import {MdChromeReaderMode, MdDeleteForever, MdModeEdit} from "react-icons/md";
import {useDispatch} from "react-redux";
import {deleteBookFetch} from "../../store/book/books.actions";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";
import {FormattedMessage} from "react-intl";

interface Prop {
    id: number
}

const ManageBooksButtons: React.FC<Prop> = ({id}) => {


    const dispatch = useDispatch();
    const readHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(push(ApplicationDynamicMap.readBookPage(id)))
    }

    const editHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(push(ApplicationDynamicMap.editBookPage(id)))

    }

    const deleteHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(deleteBookFetch(id))
    }

    return (
        <ButtonToolbar className="justify-content-center" aria-label="Toolbar with button groups">
            <ButtonGroup className="" aria-label="First group">
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-read`}
                        >
                            <FormattedMessage id="account.tabs.books.table.manage.buttons.read"
                                              defaultMessage="Read"
                                              description="Read tooltip"
                            />
                        </Tooltip>
                    }
                >
                    <Button variant="outline-info"
                            onClick={readHandler}
                    >
                        <MdChromeReaderMode size="25px"/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-edit`}>
                            <FormattedMessage id="account.tabs.books.table.manage.buttons.edit"
                                              defaultMessage="Edit"
                                              description="Edit tooltip"
                            />
                        </Tooltip>
                    }
                >
                    <Button variant="outline-warning"
                            onClick={editHandler}
                    >
                        <MdModeEdit size="25px"/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-delete`}
                        >
                            <FormattedMessage id="account.tabs.books.table.manage.buttons.delete"
                                              defaultMessage="Delete"
                                              description="Delete tooltip"
                            />
                        </Tooltip>
                    }
                >
                    <Button variant="outline-danger"
                            onClick={deleteHandler}
                    >
                        <MdDeleteForever size="25px"/>
                    </Button>
                </OverlayTrigger>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

export default ManageBooksButtons;