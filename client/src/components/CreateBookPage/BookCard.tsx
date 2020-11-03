import React from "react";
import DropImage from "./DropImage";
import {Card, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";


const BookCard = () => {

    return (
        <Card className="mt-3">
            <Row style={{height: '100%'}}>
                <Col lg={3} className="m-2">
                    <DropImage/>
                </Col>
                <Col className="">
                    <Container className="mt-3">
                        <Row className="justify-content-between">
                            <InputGroup className="mb-3 pr-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="book-name">Book name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-describedby="book-name"/>
                            </InputGroup>
                        </Row>
                        <Row className="">
                            <InputGroup className="mb-3 pr-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="gainers">Gainers</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-describedby="gainers"/>
                            </InputGroup>
                        </Row>
                        <Row className="">
                            <InputGroup className="mb-3 pr-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="tags">Tags</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-describedby="tags"/>
                            </InputGroup>
                        </Row>
                        <Row className="mb-4 pr-3">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Annotation</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea"
                                             aria-label="With textarea"
                                             style={{minHeight: "175px", resize: "none"}}
                                />
                            </InputGroup>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Card>
    )
}

export default BookCard