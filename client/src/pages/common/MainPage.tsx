import React, {useEffect} from "react";
import BookListCard from "../../components/MainPage/BookListCard";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {getAllBooksFetch} from "../../store/book/books.actions";
import {RootState} from "../../store/reducers";
import {Container} from "react-bootstrap";
import {checkAuth} from "../../store/credential/credential.actions";
import {IBookFromDb} from "../../../../interfaces/IBook";

const mapState = ({books}: RootState): { books: IBookFromDb[] } => ({books: books.books})
const mapDispatch = {getAllBooks: getAllBooksFetch, checkAuth}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const MainPage: React.FC<PropsFromRedux> = ({
                                                books,
                                                getAllBooks
                                            }) => {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBooks())
    },[])

    return (
        <Container>
            {
                books
                && ~books.length
                && books.map((book) => {

                        return (
                            <BookListCard key={book.id}
                                          {...book}
                            />
                        )
                    }
                )
            }
        </Container>
    )
}

export default connector(MainPage);