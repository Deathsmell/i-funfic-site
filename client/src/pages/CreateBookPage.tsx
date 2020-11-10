import React, {MouseEvent, useState} from "react";
import BookCard from "../components/CreateBookPage/BookCard";
import {useDispatch, useSelector} from "react-redux";
import {selectorUserId, selectorUsername} from "../store/credential/credential.selectors";
import {createBookFetch} from "../store/book/books.actions";
import {Button, Row} from "react-bootstrap";
import {BookGenres, IBook} from "../../../interfaces";

const CreateBookPage: React.FC = () => {

    const dispatch = useDispatch();
    const imageState = useState<string>();
    const annotationState = useState<string>("");
    const titleState = useState<string>("");
    const authorId = useSelector(selectorUserId);
    const authorName = useSelector(selectorUsername);

    const createBookHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const [annotation] = annotationState;
        const [image] = imageState;
        const [title] = titleState;
        if (authorId && authorName) {
            let genres: BookGenres[] = []
            const book: IBook = {
                authorId,
                annotation,
                title,
                image,
                authorName,
                genres,
            };
            dispatch(createBookFetch(book))
        }
    }

    return (
        <div>
            <h1 className={"text-center"}>Create page</h1>
            <BookCard
                imageState={imageState}
                annotationState={annotationState}
                titleState={titleState}
            />
            <Row className="justify-content-center mt-5">
                <Button variant="primary"
                        size="lg"
                        className="mb-3"
                        onClick={createBookHandler}
                >
                    Create
                </Button>
            </Row>
        </div>
    )
}

export default CreateBookPage