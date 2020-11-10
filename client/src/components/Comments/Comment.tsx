import React from "react";
import {Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

interface Props {
    image?: string,
    username: string,
    text: string,
    updateAt: string
}

const Comment: React.FC<Props> = ({
                                      text,
                                      image,
                                      username,
                                      updateAt
                                  }) => {

    return (
        <Card className="mt-4">
            <Card.Body>
                <Row>
                    <Col lg={2} className="text-center">
                        <Image roundedCircle
                               height="100px"
                               width="100px"
                               style={{objectFit: 'cover'}}
                               src={image}/>
                        <br/>
                        <strong>
                            {username}
                        </strong>
                    </Col>
                    <Col>
                        <Container>
                            {text}
                        </Container>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="text-muted text-center">{updateAt}</Card.Footer>
        </Card>
    )
}

export default Comment;