import React, {ChangeEvent, MouseEvent, useState} from "react";
import DropImage from "../DropImage";
import {Button, Card, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectorUserId, selectorUsername} from "../../store/credential/credential.selectors";
import {createBookFetch} from "../../store/book/books.actions";


const BookCard = () => {

    const [image, setImage] = useState<string | undefined>();
    const [annotation, setAnnotation] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const authorId = useSelector(selectorUserId);
    const authorName = useSelector(selectorUsername);
    const dispatch = useDispatch();

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const annotationHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnnotation(e.target.value)
    }


    const createBookHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(createBookFetch({
            authorId,
            annotation,
            title,
            image,
            authorName
        }))
    }

    return (
        <Card className="mt-3">
            <Row style={{height: '100%'}}>
                <Col lg={3} className="m-2">
                    <DropImage image={image}
                               setImage={setImage}
                    />
                </Col>
                <Col className="">
                    <Container className="mt-3">
                        <Row className="justify-content-between">
                            <InputGroup className="mb-3 pr-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="book-name">Book name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-describedby="book-name"
                                             value={title}
                                             onChange={titleHandler}
                                />
                            </InputGroup>
                        </Row>
                        <Row className="">
                            <InputGroup className="mb-3 pr-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="gainers">Gainers</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-describedby="gainers"
                                             readOnly
                                             placeholder={"Dont work..."}
                                />
                            </InputGroup>
                        </Row>
                        <Row className="">
                            <InputGroup className="mb-3 pr-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="tags">Tags</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-describedby="tags"
                                             readOnly
                                             placeholder={"Dont work..."}
                                />
                            </InputGroup>
                        </Row>
                        <Row className="mb-4 pr-3">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Annotation</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea"
                                             value={annotation}
                                             aria-label="With textarea"
                                             style={{minHeight: "175px", resize: "none"}}
                                             onChange={annotationHandler}
                                />
                            </InputGroup>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Button variant="primary"
                        size="lg"
                        className="mb-3"
                        onClick={createBookHandler}
                >
                    Create
                </Button>
            </Row>
        </Card>
    )
}

export default BookCard