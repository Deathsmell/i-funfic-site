import React, {MouseEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectorUserId, selectorUsername} from "../../store/credential/credential.selectors";
import {createBookFetch} from "../../store/book/books.actions";
import {Button, Container, Row} from "react-bootstrap";
import {IBook, ITagItem} from "../../../../interfaces";
import BookCard from "../../components/CreateBookPage/BookCard";
import {FormattedMessage} from "react-intl";

const CreateBookPage: React.FC = () => {

    const dispatch = useDispatch();
    const imageState = useState<string>();
    const annotationState = useState<string>("");
    const titleState = useState<string>("");
    const authorId = useSelector(selectorUserId);
    const authorName = useSelector(selectorUsername);
    const tagsState = useState<Array<ITagItem>>([]);
    const gainersState = useState<Array<ITagItem>>([]);

    const isEmpty = (str?: string) => str === null || str?.trim() === ""

    const createBookHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const [annotation] = annotationState;
        const [image] = imageState;
        const [title] = titleState;
        const [gainers] = gainersState;
        const [tags] = tagsState;
        if (authorId && authorName && !isEmpty(title) && !isEmpty(annotation)) {
            const book: IBook = {
                authorId,
                annotation,
                title,
                image,
                authorName,
                gainers: [...gainers.map(({value}) => value)],
                tags: [...tags.map(({value})=> value)]
            };
            dispatch(createBookFetch(book))
        } else {
            console.warn("Some error when create book. Title or annotation field maybe empty")
        }
    }

    return (
        <Container>
            <h1 className={"text-center"}>
                <FormattedMessage id="createbookpage.header"
                                  defaultMessage="Create book page"
                                  description="Create book page header"
                />
            </h1>
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
                    <FormattedMessage id="createbookpage.button"
                                      defaultMessage="Create book"
                                      description="Create book button"
                    />
                </Button>
            </Row>
        </Container>
    )
}

export default CreateBookPage