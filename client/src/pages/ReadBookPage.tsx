import React, {useState} from "react";
import {Col, ListGroup, Row} from "react-bootstrap";
import useWindowDimensions from "../hooks/useWindowDimensions";

const ReadBookPage: React.FC = () => {


    const [chapters] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    const {height} = useWindowDimensions();

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
                        {chapters.map((number, index) => (
                            <ListGroup.Item action href={`#link${number}`}>
                                Chapter {number}
                            </ListGroup.Item>))
                        }
                    </ListGroup>
                </div>
            </Col>
            <Col lg={8}
                 className={"ml-5"}
                 style={{textAlign: "justify"}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, laboriosam minima nobis non numquam
                quod? Ab, ad cumque magnam modi nesciunt odit quam sunt ut. Asperiores eaque exercitationem perferendis
                veritatis.
            </Col>
        </Row>
    )
}

export default ReadBookPage