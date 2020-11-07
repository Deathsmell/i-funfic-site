import React, {MouseEvent, useEffect, useState} from "react";
import BookCard from "../components/CreateBookPage/BookCard";
import ListChapters from "../components/CreateBookPage/ListChapters";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectorBook} from "../store/book/books.selectors";
import {selectorChapters} from "../store/chapters/chapters.selectors";
import {updateBookFetch} from "../store/book/books.actions";
import {Button, Row} from "react-bootstrap";

const EditBookPage: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const book = useSelector(selectorBook(Number(id)));
    const chapters = useSelector(selectorChapters(Number(id)))

    const [updating, setUpdating] = useState<boolean>(false);
    const imageState = useState<string | undefined>(book!.image);
    const annotationState = useState<string | undefined>(book!.annotation);
    const titleState = useState<string | undefined>(book!.title);

    const [image] = imageState
    const [annotation] = annotationState
    const [title] = titleState

    useEffect(function updateBook() {
        if (updating) {
            dispatch(updateBookFetch({...book, image, annotation, title}))
        }
        setUpdating(false)
    }, [updating])

    const updateBookHandler = (e: MouseEvent) => {
        e.preventDefault()
        setUpdating(true)
    }

    return (
        <div>
            <h1 className={"text-center"}>Edit book page</h1>
            <BookCard annotationState={annotationState}
                      imageState={imageState}
                      titleState={titleState}
            />
            <Row className="justify-content-center">
                <Button variant="primary"
                        size="lg"
                        className="mt-5"
                        onClick={updateBookHandler}
                >
                    Save updates
                </Button>
            </Row>
            <ListChapters chapters={chapters}
                          bookId={book!.id!}
            />
        </div>
    )
}

export default EditBookPage