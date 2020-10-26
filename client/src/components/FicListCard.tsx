import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import {Fic} from "../MordorsTest";

const FicListCard: React.FC<Fic> = (
    {
        tags,
        genres,
        img,
        name,
        annotation,
        author,
        lastUpdate,
        rating,
    }) => {

    return (
        <Card className="text-center mt-3 mb-2">
            <Card.Img variant="top"
                      className="fic-card-img"
                      style={{maxHeight: '200px' }}
                      src={img}/>
            <Card.Header>
                <h3>{name}</h3>
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <Row className="text-left">
                        <Col className="justify-content-start">
                            Autor: {author}
                        </Col>
                        <Col className="text-right">
                            Reiting: {rating}
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    <Row className="m-4">
                        <strong>Genres:</strong>
                        &nbsp;
                        {genres.map((genre, index) =>
                            <Badge key={index} className="mx-1" variant="secondary">{genre}</Badge>)}
                    </Row>
                    <Row className="m-4">
                        <strong>Tags:</strong>
                        &nbsp;
                        {tags.map((tag, index) =>
                            <Badge key={index} className="mx-1" variant="secondary">{tag}</Badge>)}
                    </Row>
                    <Row className="m-4">
                        <strong>Annotation:</strong>
                        &nbsp;
                        {annotation}
                    </Row>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Row className="text-left justify-content-end">
                    <Col className="align-self-center">
                        {lastUpdate}
                    </Col>
                    <Button variant="primary">Read</Button>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default FicListCard;