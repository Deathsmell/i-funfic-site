import React, {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createChapter, updateChapter} from "../../store/chapters/chapters.actions";
import {useLocation, useParams} from "react-router";
import ChapterEditor from "../../components/ChapterPage/ChapterEditor";
import {selectorChapter} from "../../store/chapters/chapters.selectors";

const EditChapterPage: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const location = useLocation();

    const [isCreatePage, setIsCreatePage] = useState<boolean>(location.pathname.includes("create"));

    const dispatch = useDispatch();
    const chapter = useSelector(selectorChapter(Number(id)));
    const [title, setTitle] = useState<string>(chapter?.title || "");
    const textState = useState<string>(chapter?.text || "");
    const [text] = textState

    useEffect(()=>{
        setIsCreatePage(location.pathname.includes("create"))
    },[location.pathname])

    const chapterHandler = (e: MouseEvent) => {
        e.preventDefault()
        if (isCreatePage){
            dispatch(createChapter({title, text, bookId: Number(id)}))
        } else {
            dispatch(updateChapter({
                    title,
                    text,
                    bookId: chapter!.bookId,
                    number: chapter!.number,
                    id: chapter!.id
                })
            )
        }
        setTitle("")
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        <Container>
            <h1 className="text-center">Edit chapter page</h1>
            <ChapterEditor title={title}
                           titleHandler={changeTitleHandler}
                           textState={textState}
            />
            <Row className="justify-content-center mt-4">
                <Button variant="success"
                        size="lg"
                        onClick={chapterHandler}
                >
                    {isCreatePage? "Create" : "Add"}
                </Button>
            </Row>
        </Container>
    )
}

export default EditChapterPage