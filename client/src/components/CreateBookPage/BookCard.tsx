import React, {ChangeEvent} from "react";
import DropImage from "../DropImage";
import {Card, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import InputTagsField from "./InputTagsField";
import {ITagItem} from "../../../../interfaces";
import {FormattedMessage} from "react-intl";
import {useSelector} from "react-redux";
import {selectorGenres} from "../../store/genres/genres.selector";


interface Props {
    imageState: [(string | undefined), React.Dispatch<string | undefined>],
    annotationState: [(string), React.Dispatch<string>],
    titleState: [(string), React.Dispatch<string>],
    tagsState: [Array<ITagItem>, React.Dispatch<React.SetStateAction<Array<ITagItem>>>],
    gainersState: [Array<ITagItem>, React.Dispatch<React.SetStateAction<Array<ITagItem>>>],
}

const BookCard: React.FC<Props> = ({
                                       imageState,
                                       titleState,
                                       annotationState,
                                       tagsState,
                                       gainersState,
                                   }) => {


    const [annotation, setAnnotation] = annotationState
    const [title, setTitle] = titleState
    const [image, setImage] = imageState
    const genres = useSelector(selectorGenres)


    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const annotationHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnnotation(e.target.value)
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
                                    <InputGroup.Text id="book-name">
                                        <FormattedMessage id="bookcard.fields.name"
                                                          defaultMessage="Book name"
                                                          description="Book name field"
                                        />
                                    </InputGroup.Text>
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
                                    <InputGroup.Text id="gainers">
                                        <FormattedMessage id="bookcard.fields.gainers"
                                                          defaultMessage="Gainers"
                                                          description="Gainers field"
                                        />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <div className={"flex-grow-1"}>
                                    <InputTagsField key={"genres"}
                                                    itemsState={gainersState}
                                                    whitelist={genres.map((genre) => ({value: genre}))}
                                                    className={"rounded-right"}
                                                    enforceWhitelist={true}
                                    />
                                </div>
                            </InputGroup>
                        </Row>
                        <Row className="">
                            <InputGroup className="mb-3 pr-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="tags">
                                        <FormattedMessage id="bookcard.fields.tags"
                                                          defaultMessage="Tags"
                                                          description="Tags field"
                                        />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <div className={"flex-grow-1"}>
                                    <InputTagsField key={"tag"}
                                                    itemsState={tagsState}
                                                    className={"rounded-right"}
                                    />
                                </div>
                            </InputGroup>
                        </Row>
                        <Row className="mb-4 pr-3">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <FormattedMessage id="bookcard.fields.annotation"
                                                          defaultMessage="Annotation"
                                                          description="Annotation field"
                                        />
                                    </InputGroup.Text>
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
        </Card>
    )
}

export default BookCard