import React, {MouseEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectorUserId, selectorUsername} from "../../store/credential/credential.selectors";
import {createBookFetch} from "../../store/book/books.actions";
import {Button, Container, Row} from "react-bootstrap";
import {BookGenres, IBook} from "../../../../interfaces";
import {TagItem} from "../../components/CreateBookPage/InputTagsField";
import BookCard from "../../components/CreateBookPage/BookCard";

const CreateBookPage: React.FC = () => {

    const dispatch = useDispatch();
    const imageState = useState<string>();
    const annotationState = useState<string>("");
    const titleState = useState<string>("");
    const authorId = useSelector(selectorUserId);
    const authorName = useSelector(selectorUsername);
    const tagsState = useState<Array<TagItem>>([]);
    const gainersState = useState<Array<TagItem>>([]);

    const createBookHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const [annotation] = annotationState;
        const [image] = imageState;
        const [title] = titleState;
        const [gainers] = gainersState;
        const [tags] = tagsState;
        if (authorId && authorName) {
            const book: IBook = {
                authorId,
                annotation,
                title,
                image,
                authorName,
                gainers: [...gainers.map(({value}) => value as BookGenres)],
                tags: [...tags.map(({value})=> value)]
            };
            dispatch(createBookFetch(book))
        }
    }

    return (
        <Container>
            <h1 className={"text-center"}>Create page</h1>
            <BookCard imageState={imageState}
                      annotationState={annotationState}
                      titleState={titleState}
                      tagsState={tagsState}
                      gainersState={gainersState}
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
        </Container>
    )
}

export default CreateBookPage