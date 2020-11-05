import React, {MouseEvent} from "react";
import BookHeaderCard from "../components/FicPage/BookHeaderCard";
import BookManagerBorder from "../components/FicPage/BookManagerBorder";
import BookCommentList from "../components/FicPage/BookCommentList";
import {useDispatch, useSelector} from "react-redux";
import {selectorBook} from "../store/book/books.selectors";
import {useParams} from "react-router";
import {selectorAuthorise} from "../store/credential/credential.selectors";
import {Button} from "react-bootstrap";
import {goBack} from "connected-react-router";

const BookPage: React.FC = () => {


    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>();
    const book = useSelector(selectorBook(Number(id)));
    const authorise = useSelector(selectorAuthorise);

    const returnHandler = (e : MouseEvent) => {
        e.preventDefault()
        dispatch(goBack())
    }

    if (book && book.authorId && book.id) {
        return (
            <>
                <BookHeaderCard {...book}/>
                <BookManagerBorder authorId={book.authorId}
                                   bookId={book.id}
                />
                {
                    authorise
                        ? <BookCommentList/>
                        : (
                            <div>
                                <h1 className="text-center mt-4" >
                                    Read and add comments can only login users
                                </h1>
                            </div>
                        )

                }
            </>
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