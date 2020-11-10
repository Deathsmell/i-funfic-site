import React from "react";
import BookListCard from "../../components/MainPage/BookListCard";
import {connect, ConnectedProps} from "react-redux";
import {getAllBooksFetch} from "../../store/book/books.actions";
import {RootState} from "../../store/reducers";
import {IBook} from "../../../../interfaces";
import {useFetching} from "../../hooks/useFetching";
import {Container} from "react-bootstrap";
import {checkAuth} from "../../store/credential/credential.actions";

const mapState = ({books}: RootState): { books: IBook[] } => ({books: books.books})
const mapDispatch = {getAllBooks: getAllBooksFetch, checkAuth}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const MainPage: React.FC<PropsFromRedux> = ({
                                                books,
                                                getAllBooks
                                            }) => {

    useFetching(getAllBooks)

    return (
        <Container>
            {
                books
                && ~books.length
                && books.map((book) => {

                        console.log("card")
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