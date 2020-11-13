import React, {MouseEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {createBookFetch} from "../../store/book/books.actions";
import {Button, Container, Row} from "react-bootstrap";
import {BookGenres, IBook} from "../../../../interfaces";
import {useParams} from "react-router";
import {UserApi} from "../../api";
import BookCard from "../../components/CreateBookPage/BookCard";
import {TagItem} from "../../components/CreateBookPage/InputTagsField";

const AdminCreateBookPage: React.FC = () => {

    const {id} = useParams() as { id: string };
    const dispatch = useDispatch();
    const imageState = useState<string>();
    const annotationState = useState<string>("");
    const titleState = useState<string>("");
    const tagsState = useState<Array<TagItem>>([]);
    const gainersState = useState<Array<TagItem>>([]);

    const createBookHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const {data:{user}} = await UserApi.getProfile(Number(id));
            const [annotation] = annotationState;
            const [image] = imageState;
            const [title] = titleState;
            let genres: BookGenres[] = []
            const book: IBook = {
                authorId: user.id,
                authorName: user.username,
                annotation,
                title,
                image,
                genres,
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
                    Create
                </Button>
            </Row>
        </Container>
    )
}

export default AdminCreateBookPage