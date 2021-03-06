import React, {useEffect, useState} from "react";
import BookListCard from "../../components/MainPage/BookListCard";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {getAllBooksByRatingFetch, getAllBooksByUpdating} from "../../store/book/books.actions";
import {RootState} from "../../store/reducers";
import {Container} from "react-bootstrap";
import {IBookFromDb} from "../../../../interfaces/IBook";
import FilterRow from "../../components/MainPage/FilterRow";
import {IBookAsyncActions} from "../../store/book/book.interfaces";
import {ITagItem} from "../../../../interfaces";
import {FormattedMessage} from "react-intl";

const mapState = ({books}: RootState): { books: IBookFromDb[] } => ({books: books.books})
const mapDispatch = {getBooksByUpdating: getAllBooksByUpdating, getBooksByRating: getAllBooksByRatingFetch}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const MainPage: React.FC<PropsFromRedux> = ({
                                                books,
                                                getBooksByRating,
                                                getBooksByUpdating
                                            }) => {

    const initialState = [
        {
            element: (
                <FormattedMessage id="filterrow.button.by.updated"
                                  defaultMessage="By update"
                                  description="By update sort button"
                />
            ),
            action: getBooksByUpdating
        },
        {
            element: (
                <FormattedMessage id="filterrow.button.by.rating"
                                  defaultMessage="By rating"
                                  description="By rating sort button"
                />
            ),
            action: getBooksByRating
        }
    ];

    const dispatch = useDispatch();
    const sortingState = useState<Array<{ element: JSX.Element, action: (tags?: string[]) => IBookAsyncActions }>>(initialState);
    const changeSortState = useState<number>(0);
    const tagsState = useState<Array<ITagItem>>([]);
    const [tags] = tagsState;

    const [soring] = sortingState
    const [changeSort] = changeSortState;

    useEffect(() => {
        dispatch(soring[changeSort].action(tags.map(({value}) => value)))
    }, [changeSort, tags])

    return (
        <Container>
            <FilterRow className="mt-4"
                       sortingState={sortingState}
                       changeSortState={changeSortState}
                       tagsState={tagsState}
            />
            {
                books
                && ~books.length
                && books.map((book) => {

                        return (
                            <BookListCard key={book.id+"book-id"}
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