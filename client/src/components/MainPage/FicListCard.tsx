import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import {IBook} from "../../../../interfaces";

const FicListCard: React.FC<IBook> = (
    {
        id,
        rating,
        authorId,
        annotation,
        genres,
        title,
        img
    }) => {

    const [tags, setTags] = useState<string[]>([]);
    const [author, setAuthor] = useState<string>();
    const lastUpdate = "never"

    useEffect(() =>{
        console.log("Render list card")
    },[])

    return (
        <div>
            <Card className="text-center mt-3 mb-2">
                <Card.Img variant="top"
                          className="fic-card-img"
                          style={{maxHeight: '200px'}}
                          src={img}/>
                <Card.Header>
                    <div>
                        <h3>{title}</h3>
                    </div>
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
                        <Row className="m-4">
                            <strong>Genres:</strong>
                            &nbsp;
                            {genres && genres.map((genre, index) =>
                                <Badge key={index} className="mx-1" variant="secondary">{genre}</Badge>)}
                        </Row>
                        <Row className="m-4">
                            <strong>Tags:</strong>
                            &nbsp;
                            {tags && tags.map((tag, index) =>
                                <Badge key={index} className="mx-1" variant="secondary">{tag}</Badge>)}
                        </Row>
                        <Row className="m-4">
                            <strong>Annotation:</strong>
                            &nbsp;
                            {annotation}
                        </Row>
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
        </div>
    )
}

export default FicListCard;