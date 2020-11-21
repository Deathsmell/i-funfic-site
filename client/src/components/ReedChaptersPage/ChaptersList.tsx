import React, {useState} from "react";
import {Collapse, ListGroup} from "react-bootstrap";
import {IChapter} from "../../../../interfaces";
import {FormattedMessage} from "react-intl";

interface Props {
    collapsed?: boolean
    height?: number | string
    chapters: IChapter[]
}

const ChaptersList: React.FC<Props> = ({
                                           height,
                                           chapters,
                                           collapsed = false
                                       }) => {

    const [show, setShow] = useState(!collapsed);

    const collapsedHandler = () => {
        if (collapsed) setShow(!show)
    }

    return (
        <div className="border-right border-bottom border-dark sticky-top">
            <h3 className="text-center" onClick={collapsedHandler}>
                <strong>
                    <FormattedMessage id="readchapterpage.chapterlist.header"
                                      defaultMessage="Chapter"
                                      description="Header"
                    />
                </strong>
            </h3>
            <Collapse in={show}>
                <ListGroup defaultActiveKey="#link1"
                           variant="flush"
                           className="chapter-list"
                           style={{minHeight: height, maxHeight: height}}
                >
                    {chapters.sort((a, b) => a.number! - b.number!)
                        .map(({number, title}) => (
                            <ListGroup.Item action
                                            key={number+"chapter-item"}
                                            href={`#link${number}`}
                            >
                                {number}. {title}
                            </ListGroup.Item>))
                    }
                </ListGroup>
            </Collapse>
        </div>
    )
}

export default ChaptersList