import React, {useState} from "react";
import {Collapse, ListGroup} from "react-bootstrap";
import {IChapter} from "../../../../interfaces";

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
                <strong>Chapters</strong>
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
                                            key={number}
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