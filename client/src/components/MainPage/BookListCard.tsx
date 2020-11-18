import React, {MouseEvent} from "react";
import moment from "moment"
import {Badge, Button, Card, Col, Row} from "react-bootstrap";
import Rating from "react-rating";
import {RiEyeCloseLine, RiEyeLine} from "react-icons/ri"
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {ApplicationDynamicMap} from "../../routes";
import {IBookFromDb} from "../../../../interfaces/IBook";
import {FormattedMessage} from "react-intl";
import GenreBadge from "../GenreBadge";

const BookListCard: React.FC<IBookFromDb> = ({
                                                 id,
                                                 rating,
                                                 authorId,
                                                 annotation,
                                                 gainers,
                                                 title,
                                                 image,
                                                 authorName,
                                                 updatedAt,
                                                 createdAt,
                                                 tags
                                             }) => {

    const dispatch = useDispatch();

    const readHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(push(ApplicationDynamicMap.bookPage(id)))
    }

    return (
        <div>
            <Card className="text-center mt-3 mb-2">
                <Card.Img variant="top"
                          className="fic-card-img"
                          style={{maxHeight: '200px'}}
                          src={image}/>
                <Card.Header>
                    <div>
                        <h3>{title}</h3>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <Row className="text-left">
                            <Col className="justify-content-start">
                                <FormattedMessage id="booklistcard.body.title.author"
                                                  defaultMessage="Author"
                                                  description="Author field name"
                                />
                                :{authorName}
                            </Col>
                            <Col className="text-right">
                                <FormattedMessage id="booklistcard.body.title.rating"
                                                  defaultMessage="Rating"
                                                  description="Rating field name"
                                />
                                :
                                <Rating initialRating={rating ? rating : 0}
                                        emptySymbol={<RiEyeCloseLine size="1em"/>}
                                        fullSymbol={<RiEyeLine size="1em"/>}
                                        readonly
                                />
                            </Col>
                        </Row>
                    </Card.Title>
                    <Row className="m-4">
                        <strong>
                            <FormattedMessage id="booklistcard.body.title.genres"
                                              defaultMessage="Genres"
                                              description="Genres field name"
                            />
                            :
                        </strong>
                        &nbsp;
                        {
                            gainers
                            && gainers.map((genre, index) => {
                                    return (
                                        <GenreBadge key={index}
                                                    genre={genre}/>
                                    )
                                }
                            )
                        }
                    </Row>
                    <Row className="m-4">
                        <strong>
                            <FormattedMessage id="booklistcard.body.title.tags"
                                              defaultMessage="Tags"
                                              description="Tags field name"
                            />
                            : &nbsp;
                        </strong>
                        {
                            tags
                            && tags.map((tag, index) =>
                                <Badge key={index} className="mx-1" variant="secondary">{tag}</Badge>
                            )
                        }
                    </Row>
                    <Row className="m-4">
                        <strong>
                            <FormattedMessage id="booklistcard.body.title.annotation"
                                              defaultMessage="Annotation"
                                              description="Annotation field name"
                            />
                            :
                        </strong>
                        &nbsp;
                        {annotation}
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Row className="text-left justify-content-end">
                        <Col className="align-self-center">
                            {moment(updatedAt).fromNow()}
                        </Col>
                        <Button variant="primary"
                                onClick={readHandler}
                        >
                            <FormattedMessage id="booklistcard.footer.button.read"
                                              defaultMessage="Read more"
                                              description="Read button name"
                            />
                        </Button>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default BookListCard;