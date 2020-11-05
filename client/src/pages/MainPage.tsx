import React from "react";
import BookListCard from "../components/MainPage/BookListCard";
import {connect, ConnectedProps} from "react-redux";
import {getAllBooksFetch} from "../store/book/books.actions";
import {RootState} from "../store/reducers";
import {IBook} from "../../../interfaces";
import {useFetching} from "../hooks/useFetching";

const mapState = ({books}: RootState): { books: IBook[] } => ({books: books.books})
const mapDispatch = {getAllBooks: getAllBooksFetch}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const MainPage: React.FC<PropsFromRedux> = ({
                                                books,
                                                getAllBooks
                                            }) => {

    useFetching(getAllBooks)

    return (
        <div>
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
        </div>
    )
}

export default connector(MainPage);