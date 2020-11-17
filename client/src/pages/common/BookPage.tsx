import React, {MouseEvent, useEffect} from "react";
import BookHeaderCard from "../../components/BookPage/BookHeaderCard";
import BookManagerButtons from "../../components/BookPage/BookManagerButtons";
import {useDispatch, useSelector} from "react-redux";
import {selectorBook} from "../../store/book/books.selectors";
import {useParams} from "react-router";
import {selectorAuthorise} from "../../store/credential/credential.selectors";
import {Button, Container, Row} from "react-bootstrap";
import {goBack} from "connected-react-router";
import Comments from "../../components/Comments/Comments";
import {addComment, getCommentsByBookId} from "../../store/comments/comments.actions";
import {getAllChaptersFetch} from "../../store/chapters/chapters.actions";
import {useWS} from "../../hooks/ws.hook";
import {FormattedMessage} from "react-intl";

type BookId = { id: string };
const BookPage: React.FC = () => {

    const dispatch = useDispatch();
    const {id} = useParams<BookId>();
    const book = useSelector(selectorBook(Number(id)));
    const authorise = useSelector(selectorAuthorise);
    const {subscribeOnComment} = useWS();

    useEffect(function loadBooksContent() {
        const bookId = Number(id);
        if (authorise) {
            dispatch(getCommentsByBookId(bookId))
            subscribeOnComment(bookId, (comment) => {
                if (comment) dispatch(addComment(comment))
            })
        }
        dispatch(getAllChaptersFetch(bookId))
    }, [authorise])

    const returnHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(goBack())
    }

    if (book && book.authorId && book.id) {
        return (
            <Container>
                <BookHeaderCard {...book}/>
                <BookManagerButtons authorId={book.authorId}
                                    bookId={book.id}
                />
                {
                    authorise
                        ? <Comments bookId={book.id}/>
                        : (
                            <div>
                                <h1 className="text-center mt-4">
                                    <FormattedMessage id="bookpage.comments.unauthorized"
                                                      defaultMessage="Read and add comments can only login users"
                                                      description="Warning not to read messages"
                                    />
                                </h1>
                            </div>
                        )

                }
            </Container>
        )
    } else {
        return (
            <Row className="mt-5 justify-content-center">
                <Row className="mt-5 justify-content-center">
                    <strong className="text-center">
                        <FormattedMessage id="bookpage.error"
                                          defaultMessage="Some error!"
                                          description="Error message"
                        />
                        :
                        {book ? book!.id : "no book"}
                    </strong>
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Button type={"success"}
                            onClick={returnHandler}
                            size={"lg"}
                    >
                        <FormattedMessage id="bookpage.error.button"
                                          defaultMessage="Return on previous page"
                                          description="Return previous page button"
                        />
                    </Button>
                </Row>
            </Row>
        )
    }
}

export default BookPage;