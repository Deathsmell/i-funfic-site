import React, {useEffect, useState} from "react";
import {Col, ListGroup, Row} from "react-bootstrap";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectorChapters} from "../store/chapters/chapters.selectors";
import {selectorHash} from "../store/router/router.selectors";

const ReadChaptersPage: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const chapters = useSelector(selectorChapters(Number(id)));
    const {height} = useWindowDimensions();
    const hash = useSelector(selectorHash);

    const [text, setText] = useState<string>("");

    useEffect(function changeChaptersText() {
        const chapterNumber = hash.replace(/#link/, "");
        if (chapterNumber) {
            const chapterText = chapters.find(({number}) => number === Number(chapterNumber));
            setText(chapterText ? chapterText.text : "Empty")
        }
    }, [hash])


    return (
        <Row noGutters>
            <Col lg={2}>
                <div className="border-right border-dark sticky-top">
                    <h3 className="text-center">
                        <strong>Chapters</strong>
                    </h3>
                    <ListGroup defaultActiveKey="#link1"
                               variant="flush"
                               className="chapter-list"
                               style={{minHeight: height - 30, maxHeight: height - 30}}
                    >
                        {chapters.sort((a, b) => a.number! - b.number!).map(({number, title}) => (
                            <ListGroup.Item action
                                            key={number}
                                            href={`#link${number}`}
                            >
                                {number}. {title}
                            </ListGroup.Item>))
                        }
                    </ListGroup>
                </div>
            </Col>
            <Col lg={8}
                 className={"ml-5"}
                 style={{textAlign: "justify"}}>
                {text}
            </Col>
        </Row>
    )
}

export default ReadChaptersPage