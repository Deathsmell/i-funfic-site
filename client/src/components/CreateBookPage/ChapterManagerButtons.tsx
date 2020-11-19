import React from "react";
import {Button, ButtonGroup, ButtonToolbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";
import {deleteChapterByBookId} from "../../store/chapters/chapters.actions";
import {FormattedMessage} from "react-intl";

interface Props {
    bookId: number
}

const ChapterManagerButtons: React.FC<Props> = ({bookId}) => {

    const dispatch = useDispatch();

    const editHandler = () => {
        dispatch(push(ApplicationDynamicMap.editChapterPage(bookId)))
    }

    const deleteHandler = () => {
        dispatch(deleteChapterByBookId(bookId))
    }

    return (
        <ButtonToolbar className="justify-content-center" aria-label="Toolbar with button groups">
            <ButtonGroup aria-label="First group">
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id={`tooltip-edit`}>
                            <FormattedMessage id="manage.buttons.edit"
                                              defaultMessage="Edit"
                                              description="Edit tooltip"
                            />
                        </Tooltip>
                    }
                >
                    <Button variant="outline-warning"
                            size="sm"
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
                            <FormattedMessage id="manage.buttons.delete"
                                              defaultMessage="Delete"
                                              description="Delete tooltip"
                            />
                        </Tooltip>
                    }
                >
                    <Button variant="outline-danger"
                            size="sm"
                            onClick={deleteHandler}
                    >
                        <MdDeleteForever size="25px"/>
                    </Button>
                </OverlayTrigger>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

export default ChapterManagerButtons