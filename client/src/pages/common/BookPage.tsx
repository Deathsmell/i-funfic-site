import React, {MouseEvent, useEffect} from "react";
import BookHeaderCard from "../../components/BookPage/BookHeaderCard";
import BookManagerBorder from "../../components/BookPage/BookManagerBorder";
import {useDispatch, useSelector} from "react-redux";
import {selectorBook} from "../../store/book/books.selectors";
import {useParams} from "react-router";
import {selectorAuthorise} from "../../store/credential/credential.selectors";
import {Button, Container} from "react-bootstrap";
import {goBack} from "connected-react-router";
import Comments from "../../components/Comments/Comments";
import {addComment, getCommentsByBookId} from "../../store/comments/comments.actions";
import {getAllChaptersFetch} from "../../store/chapters/chapters.actions";
import {useWS} from "../../hooks/ws.hook";

type BookId = { id: string };
const BookPage: React.FC = () => {

    const dispatch = useDispatch();
    const {id} = useParams<BookId>();
    const book = useSelector(selectorBook(Number(id)));
    const authorise = useSelector(selectorAuthorise);
    const {subscribeOnComment} = useWS();

    useEffect(function loadBooksContent(){
        const bookId = Number(id);
        if (authorise) {
            dispatch(getCommentsByBookId(bookId))
            subscribeOnComment(bookId,(comment) => {
                if (comment) dispatch(addComment(comment))
            })
        }
        dispatch(getAllChaptersFetch(bookId))
    },[authorise])

    const returnHandler = (e : MouseEvent) => {
        e.preventDefault()
        dispatch(goBack())
    }

    if (book && book.authorId && book.id) {
        return (
            <Container>
                <BookHeaderCard {...book}/>
                <BookManagerBorder authorId={book.authorId}
                                   bookId={book.id}
                />
                {
                    authorise
                        ? <Comments bookId={book.id}/>
                        : (
                            <div>
                                <h1 className="text-center mt-4" >
                                    Read and add comments can only login users
                                </h1>
                            </div>
                        )

                }
            </Container>
        )
    } else {
        return (
            <>
                <strong>Some ERROR!: {book ? book!.id : "no book"}</strong>
                <Button type={"success"}
                        onClick={returnHandler}
                >
                    Return on previous page
                </Button>
            </>
        )
    }
}

export default BookPage;