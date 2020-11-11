import React, {MouseEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {createBookFetch} from "../../store/book/books.actions";
import {Container} from "react-bootstrap";
import {BookGenres, IBook} from "../../../../interfaces";
import CreateBookDashboard from "../../components/CreateBookPage/CreateBookDashboard";
import {useParams} from "react-router";
import {UserApi} from "../../api";

const AdminCreateBookPage: React.FC = () => {

    const {id} = useParams() as { id: string };
    const dispatch = useDispatch();
    const imageState = useState<string>();
    const annotationState = useState<string>("");
    const titleState = useState<string>("");

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
            <CreateBookDashboard imageState={imageState}
                                 annotationState={annotationState}
                                 titleState={titleState}
                                 createBookHandler={createBookHandler}
            />
        </Container>
    )
}

export default AdminCreateBookPage