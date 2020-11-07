import React, {MouseEvent, useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import ManageBookButtons from "./ManageBookButtons";
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa";
import {RootState} from "../../store/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getBooksByAuthorIdFetch} from "../../store/book/books.actions";
import {IBook} from "../../../../interfaces";
import {IFilterBookTableState} from "./UserInfoTabs";


const mapProps = ({books}: RootState) => books
const mapDispatch = {getBooksByAuthorId: getBooksByAuthorIdFetch}
const connector = connect(mapProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

interface Props {
    filterState: [IFilterBookTableState, React.Dispatch<React.SetStateAction<IFilterBookTableState>>]
}

const arrow = {
    size: "15px",
}

type Sorter = ((a: IBook, b: IBook) => number)

const UserBookTable: React.FC<PropsFromRedux & Props> = ({
                                                             myBook,
                                                             filterState
                                                         }) => {

    const [filter] = filterState

    const filterHandler = (book: IBook) => {
        if (!filter.string || filter.string.trim() === "") return true
        if (filter.type !== "all") {
            const bookElement = book[filter.type];
            if (typeof bookElement !== "string") {
                return true
            } else {
                return bookElement.toLowerCase().includes(filter.string.toLowerCase())
            }
        } else {
            return book.title?.toLowerCase().includes(filter.string.toLowerCase())
            // || book.genres?.includes()
        }
    }

    const [sortedByNumber, setSortedByNumber] = useState<boolean | null>(null);
    const [sortedByName, setSortedByName] = useState<boolean | null>(null);
    const [sortedByLike, setSortedByLike] = useState<boolean | null>(null);
    const [sorter, setSorter] = useState<Sorter>();

    const sortByNumber = (desc: boolean): Sorter => (a: IBook, b: IBook): number => {
        if (!(a && b && a.createdAt && b.createdAt)) return 0
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        if (desc)
            return bDate - aDate;
        else
            return aDate - bDate
    }

    const sortByName = (desc: boolean): Sorter => (a: IBook, b: IBook): number => {
        if (!(a && b && a.title && b.title)) return 0
        if (a.title > b.title) {
            if (desc) return -1;
            else return 1;
        }
        if (a.title < b.title) {
            if (desc) return 1;
            else return -1;
        }
        return 0;
    }

    useEffect(function changeSorterWhenRemounted () {
        if (sortedByNumber !== null)
            setSorter(() => sortByNumber(sortedByNumber))
        if (sortedByName !== null)
            setSorter(() => sortByName(sortedByName))
        if (sortedByName === null && sortedByNumber === null) {
            setSorter(() => sortByNumber(false))
        }
    }, [sortedByName, sortedByNumber])


    const sortedByNameHandler = () => {
        setSortedByNumber(null)
        setSortedByName((prev) => {
            if (prev === null) return true
            if (prev) return false
            return null
        })
    }

    const sortedByNumberHandler = () => {
        setSortedByName(null)
        setSortedByNumber((prev) => {
            if (prev === null) return true
            if (prev) return false
            return null
        })
    }

    return (
        <Table striped bordered hover>
            <thead>
            <tr className="book-table-header">
                <th scope="col"
                    className="col-1 text-center"
                    onClick={sortedByNumberHandler}
                >
                    #
                    {
                        sortedByNumber !== null
                        && (
                            sortedByNumber
                                ? <FaLongArrowAltDown {...arrow}/>
                                : <FaLongArrowAltUp {...arrow}/>
                        )
                    }
                </th>
                <th scope="col"
                    className="text-center"
                    onClick={sortedByNameHandler}
                >
                    Book name
                    {
                        sortedByName !== null
                        && (
                            sortedByName
                                ? <FaLongArrowAltDown {...arrow}/>
                                : <FaLongArrowAltUp {...arrow}/>
                        )
                    }
                </th>
                <th scope="col"
                    className="col-1"
                >
                    Likes
                    {
                        sortedByLike
                        && (
                            sortedByLike
                                ? <FaLongArrowAltDown {...arrow}/>
                                : <FaLongArrowAltUp {...arrow}/>
                        )
                    }
                </th>
                <th scope="col"
                    className="col-2 text-center"
                >
                    Manage
                </th>
            </tr>
            </thead>
            <tbody className="text-center">
            {
                myBook && myBook.length !== 0
                    ? myBook.sort(sorter).filter(filterHandler).map(({title, id, rating}) =>
                        (
                            <tr className="book-table-row"
                                key={id}
                            >
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{rating}</td>
                                <td>
                                    <ManageBookButtons id={id!}/>
                                </td>
                            </tr>
                        )
                    )
                    : (
                        <tr className="book-table-row">
                            <td colSpan={4}>Not find books</td>
                        </tr>
                    )
            }
            </tbody>
        </Table>
    )
}

export default connector(UserBookTable);