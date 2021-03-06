import React, {MouseEvent, useEffect, useState} from "react";
import BookCard from "../../components/CreateBookPage/BookCard";
import ListChapters from "../../components/CreateBookPage/ListChapters";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectorBook} from "../../store/book/books.selectors";
import {selectorChapters} from "../../store/chapters/chapters.selectors";
import {updateBookFetch} from "../../store/book/books.actions";
import {Button, Container, Row} from "react-bootstrap";
import { ITagItem} from "../../../../interfaces";
import {FormattedMessage} from "react-intl";

const EditBookPage: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const book = useSelector(selectorBook(Number(id)));
    const chapters = useSelector(selectorChapters(Number(id)))

    const [updating, setUpdating] = useState<boolean>(false);
    const imageState = useState<string | undefined>(book?.image);
    const annotationState = useState<string>(book?.annotation || "");
    const titleState = useState<string>(book?.title || "");
    const tagsState = useState<Array<ITagItem>>(book?.tags.map(tag => ({value: tag})) || []);
    const gainersState = useState<Array<ITagItem>>(book?.gainers.map(tag => ({value: tag})) || []);

    const [image] = imageState
    const [annotation] = annotationState
    const [title] = titleState
    const [gainers] = gainersState
    const [tags] = tagsState

    useEffect(function updateBook() {
        if (updating && book) {
            let newTags = tags.map(({value}) => value)
            let newGainers = gainers.map(({value}) => value)
            dispatch(updateBookFetch({...book, image, annotation, title, gainers: newGainers,tags: newTags}))
        }
        setUpdating(false)
    }, [updating])

    const updateBookHandler = (e: MouseEvent) => {
        e.preventDefault()
        setUpdating(true)
    }

    if (book) {
        return (
            <Container>
                <h1 className={"text-center"}>
                    <FormattedMessage id="editbookpage.header"
                                      defaultMessage="Edit book page"
                                      description="Edit book page header"
                    />
                </h1>
                <BookCard annotationState={annotationState}
                          imageState={imageState}
                          titleState={titleState}
                          tagsState={tagsState}
                          gainersState={gainersState}
                />
                <Row className="justify-content-center">
                    <Button variant="primary"
                            size="lg"
                            className="mt-5"
                            onClick={updateBookHandler}
                    >
                        <FormattedMessage id="editbookpage.button"
                                          defaultMessage="Save update"
                                          description="Edit book page button"
                        />
                    </Button>
                </Row>
                <ListChapters chapters={chapters}
                              bookId={book.id}
                />
            </Container>
        )
    } else {
        return (
            <h1 className="text-center">
                <FormattedMessage id="editbookpage.error"
                                  defaultMessage="Some error"
                                  description="Error load page message"
                />
            </h1>
        )
    }
}

export default EditBookPage