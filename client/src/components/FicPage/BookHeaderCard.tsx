import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import {IBook} from "../../../../interfaces";

const BookHeaderCard: React.FC<IBook> = (
    {
        id,
        title,
        createdAt,
        updatedAt,
        rating,
        authorName,
        image,
        authorId,
        annotation,
        genres,
    }
) => {

    const [tags] = useState([]);

    return (
        <Card className="mt-3">
            <Row style={{height: '100%'}}>
                <Col lg={3} className="m-2">
                    <Image src={image} rounded className="fic-card-img"/>
                </Col>
                <Col className="">
                    <Container className="mt-3">
                        <Row className="justify-content-between">
                            <Col className="text-left">
                                <h1>
                                    <strong>
                                        {title}
                                    </strong>
                                </h1>
                            </Col>
                            <Col className="text-right">
                                <h1>
                                    <strong>
                                        Rating: {rating}
                                    </strong>
                                </h1>
                            </Col>
                        </Row>
                        <Row className="m-1">
                            <h4>
                                Author: {authorName}
                            </h4>
                        </Row>
                        <Row className="m-1">
                            Genres: &nbsp;
                            {genres && genres.map((genre, index) =>
                                <Badge key={index} className="mx-1" variant="secondary">{genre}</Badge>)}
                        </Row>
                        <Row className="m-1">
                            Tags:&nbsp;
                            {tags && tags.map((tag, index) =>
                                <Badge key={index} className="mx-1" variant="secondary">{tag}</Badge>)}
                        </Row>
                        <Row className="m-1">
                            <h5>Annotation:</h5>
                            {annotation}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Card>
    )
}

export default BookHeaderCard