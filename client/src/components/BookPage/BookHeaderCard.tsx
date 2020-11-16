import React, {useEffect, useRef, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import {RiEyeCloseLine, RiEyeLine} from "react-icons/ri";
import Rating from "react-rating";
import {useSelector} from "react-redux";
import {selectorAuthorise, selectorUserId} from "../../store/credential/credential.selectors";
import {IBookFromDb} from "../../../../interfaces/IBook";
import {RatingApi} from "../../api/rating";
import Holder from "holderjs";

const BookHeaderCard: React.FC<IBookFromDb> = (
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
        gainers,
        tags
    }
) => {


    const authorise = useSelector(selectorAuthorise);
    const userId = useSelector(selectorUserId)
    const [iSetRating, setISetRating] = useState<boolean>(false);

    useEffect(() => {
        if (authorise && userId) {
            RatingApi.iSetRating(userId, id)
                .then(res => {
                    setISetRating(res.data.set)
                })
                .catch(console.error)
        }
    }, [])

    const ratingHandler = (rating: number) => {
        if (userId && authorise && !iSetRating) {
            RatingApi.setRating(userId,id,rating)
                .then(res => {
                    console.log(res);
                })
                .catch(console.error)
        }
    }

    const ref = useRef() as any;

    useEffect(() => {
        if (!image) Holder.run(ref.target)
    })

    return (
        <Card className="mt-4">
            <Row style={{height: '100%'}}>
                <Col lg={3} className="m-2">
                    <Image src={image || `holder.js/${300}x${250}?text=No image`}
                           rounded
                           className="fic-card-img"
                           ref={ref}
                    />
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
                                        <Rating initialRating={rating ? rating : 0}
                                                emptySymbol={<RiEyeCloseLine size="1em"/>}
                                                fullSymbol={<RiEyeLine size="1em"/>}
                                                readonly={!authorise && !iSetRating}
                                                onClick={ratingHandler}
                                        />
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
                            {gainers && gainers.map((genre, index) =>
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