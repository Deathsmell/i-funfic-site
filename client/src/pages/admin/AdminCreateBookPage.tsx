import React, {MouseEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {createBookFetch} from "../../store/book/books.actions";
import {Button, Container, Row} from "react-bootstrap";
import {BookGenres, IBook} from "../../../../interfaces";
import {useParams} from "react-router";
import {UserApi} from "../../api";
import BookCard from "../../components/CreateBookPage/BookCard";
import {ITagItem} from "../../../../interfaces";
import {FormattedMessage} from "react-intl";

const AdminCreateBookPage: React.FC = () => {

    const {id} = useParams() as { id: string };
    const dispatch = useDispatch();
    const imageState = useState<string>();
    const annotationState = useState<string>("");
    const titleState = useState<string>("");
    const tagsState = useState<Array<ITagItem>>([]);
    const gainersState = useState<Array<ITagItem>>([]);

    const createBookHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const {data: {user}} = await UserApi.getProfile(Number(id));
            const [annotation] = annotationState;
            const [image] = imageState;
            const [title] = titleState;
            const [gainers] = gainersState;
            const [tags] = tagsState;
            const book: IBook = {
                authorId: user.id,
                authorName: user.username,
                annotation,
                title,
                image,
                gainers: [...gainers.map(({value}) => value as BookGenres)],
                tags: [...tags.map(({value}) => value)]
            }
            dispatch(createBookFetch(book))
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <Container>
            <h1 className={"text-center"}>Admin create page</h1>
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

export default AdminCreateBookPage