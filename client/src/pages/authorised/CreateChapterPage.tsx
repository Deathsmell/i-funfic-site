import React, {ChangeEvent, MouseEvent, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {createChapter} from "../../store/chapters/chapters.actions";
import {useParams} from "react-router";
import ChapterEditor from "../../components/ChapterPage/ChapterEditor";

const CreateChapterPage: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");

    const createChapterHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(createChapter({title, text, bookId: Number(id)}))
    }

    const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        <Container>
            <h1 className="text-center">Edit chapter page</h1>
            <ChapterEditor title={title}
                           titleHandler={changeTitleHandler}
                           text={text}
                           textHandler={changeTextHandler}
            />
            <Row className="justify-content-center mt-4">
                <Button variant="success"
                        size="lg"
                        onClick={createChapterHandler}
                >
                    Create
                </Button>
            </Row>
        </Container>
    )
}

export default CreateChapterPage