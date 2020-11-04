import React from "react";
import FicListCard from "../components/MainPage/FicListCard";
import {connect, ConnectedProps} from "react-redux";
import {getAllBooks} from "../store/book/books.actions";
import {RootState} from "../store/reducers";
import {IBook} from "../../../interfaces";
import {useFetching} from "../hooks/useFetching";

const mapState = ({books}: RootState): { books: IBook[] } => ({books: books.books})
const mapDispatch = {getAllBooks}
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
                && books.map(({title, annotation, authorId, genres, id, rating, image,authorName}) => {

                        console.log("card")
                        return (
                            <FicListCard key={id}
                                         genres={genres}
                                         authorId={authorId}
                                         rating={rating}
                                         annotation={annotation}
                                         id={id}
                                         title={title}
                                         image={image}
                                         authorName={authorName}
                            />
                        )
                    }
                )
            }
        </div>
    )
}

export default connector(MainPage);