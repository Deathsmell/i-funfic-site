import React, {useEffect, useRef, useState} from "react";
import ReactMarkdown from 'react-markdown'
import {Button, Col, Container, Row} from "react-bootstrap";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectorChapters} from "../../store/chapters/chapters.selectors";
import {selectorHash} from "../../store/router/router.selectors";
import {selectorAuthorise, selectorUserId} from "../../store/credential/credential.selectors";
import {push} from "connected-react-router";
import LikeBtn from "../../components/LikeBtn";
import ChaptersList from "../../components/ReedChaptersPage/ChaptersList";
import Comments from "../../components/Comments/Comments";
import {LikeApi} from "../../api/like";

const whatChapterNumber = (hash: string) => Number(hash.replace(/#link/, ""));

type BookIdParam = { id: string };

const ReadChaptersPage: React.FC = () => {
    const ref = useRef<any>();
    const dispatch = useDispatch();
    const {id} = useParams<BookIdParam>();
    const chapters = useSelector(selectorChapters(Number(id)));
    const {windowDimensions: {width, height}, breakPoint} = useWindowDimensions();
    const hash = useSelector(selectorHash);
    const authorise = useSelector(selectorAuthorise);
    const userId = useSelector(selectorUserId);
    const chapterNum = whatChapterNumber(hash);
    const [showLike, setShowLike] = useState(false);
    const firstChapterTitle = () => chapters && chapters.length ? chapters[0].title : "";
    const firstChapterText = () => chapters && chapters.length ? chapters[0].text : "";
    const [title, setTitle] = useState<string>(firstChapterTitle);
    const [text, setText] = useState<string>(firstChapterText());
    const likedState = useState<boolean>(false);
    const [liked, setLiked] = likedState;

    const chapter = chapters.find(({number}) => number === chapterNum);

    useEffect(()=>{
        if (!hash || hash.trim() === "") {
            dispatch(push("#link1"))
        }
    },[hash])

    useEffect(function changeChaptersText() {
        if (hash) {
            setText(chapter ? chapter.text : "Empty")
            setTitle(chapter ? chapter.title : "")
        }
    }, [hash])

    const prevHandler = () => {
        window.scrollTo(0, 0)
        dispatch(push(`#link${chapterNum - 1}`))
    }

    const nextHandler = () => {
        window.scrollTo(0, 0)
        dispatch(push(`#link${chapterNum + 1}`))
    }

    useEffect(() => {
        if (authorise && userId && chapter) {
            LikeApi.iLikedIt(userId, chapter.id)
                .then(res => {
                    const like = res.data.liked;
                    setLiked(like)
                }).catch(error => {
                console.error(error)
            })
        }
    }, [hash])

    useEffect(() => {
        if (authorise) {
            const listener = () => {
                if (!showLike && !(window.pageYOffset < (ref.current.offsetHeight - (height * 2)))) {
                    setShowLike(true)
                } else {
                    setShowLike(false)
                }
            };
            window.addEventListener("scroll", listener)
            return () => window.removeEventListener("scroll", listener)
        }
    }, [authorise])

    if (chapters && chapters.length){
        return (
            <div>
                {showLike && chapter &&  <LikeBtn chapterId={chapter.id} likedState={likedState}/>}
                {
                    width <= breakPoint.md
                    && (
                        <Row noGutters>
                            <Col>
                                <ChaptersList chapters={chapters} collapsed={true}/>
                            </Col>
                        </Row>
                    )
                }
                <Row noGutters>
                    {
                        width > breakPoint.md
                        &&
                        <Col xl={2} lg={2} md={2}>
                            <ChaptersList chapters={chapters}
                                          height={height}
                            />
                        </Col>
                    }
                    <Col/>
                    <Col xl={9} lg={9} md={9} sm={11} xs={11}
                         className="mt-4 mx-2"
                         style={{textAlign: "justify",}}
                         ref={ref}
                    >
                        <h2 className="text-center">{title}</h2>
                        <ReactMarkdown>{text}</ReactMarkdown>
                    </Col>
                    <Col/>
                </Row>
                <Row noGutters className="justify-content-between mt-4">
                    <Button className="col-5"
                            variant="outline-dark"
                            onClick={prevHandler}
                            disabled={1 === chapterNum}
                    >
                        {"<<"} Previous
                    </Button>
                    <Button className="col-5"
                            variant="outline-dark"
                            onClick={nextHandler}
                            disabled={chapters.length === chapterNum}
                    >
                        Next {">>"}
                    </Button>
                </Row>
                <Container>
                    {
                        authorise
                            ? <Comments bookId={Number(id)}/>
                            : (
                                <div>
                                    <h1 className="text-center mt-4">
                                        Read and add comments can only login users
                                    </h1>
                                </div>
                            )
                    }
                </Container>
            </div>
        )
    } else {
        return (
            <h1 className="text-center">Empty book</h1>
        )
    }
}

export default ReadChaptersPage