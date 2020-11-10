import React, {ChangeEvent, MouseEvent, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {updateChapter} from "../../store/chapters/chapters.actions";
import {useParams} from "react-router";
import ChapterEditor from "../../components/ChapterPage/ChapterEditor";
import {selectorChapter} from "../../store/chapters/chapters.selectors";

const EditChapterPage: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const chapter = useSelector(selectorChapter(Number(id)));
    const [title, setTitle] = useState<string>(chapter!.title);
    const [text, setText] = useState<string>(chapter!.title);

    const createChapterHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(updateChapter({
                title,
                text,
                bookId: chapter!.bookId,
                number: chapter!.number,
                id: chapter!.id
            })
        )
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
                    Add
                </Button>
            </Row>
        </Container>
    )
}

export default EditChapterPage