import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import ManageBooksButtons from "./ManageBooksButtons";
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa";
import {IBook} from "../../../../interfaces";
import {IFilterBookTableState} from "./UserProfileTabs";
import {IBookFromDb} from "../../../../interfaces/IBook";


interface Props {
    books: IBookFromDb[]
    filterState: [IFilterBookTableState, React.Dispatch<React.SetStateAction<IFilterBookTableState>>]
}

const arrow = {
    size: "15px",
}

type Sorter = ((a: IBook, b: IBook) => number)

const UserBookTable: React.FC<Props> = ({
                                            books,
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
    const [sortedByRating, setSortedByRating] = useState<boolean | null>(null);
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

    const sortByRating = (desk: boolean): Sorter => (a: IBook, b: IBook): number =>
        a.rating && b.rating
            ? (a?.rating - b?.rating)
            : 0


    useEffect(function changeSorterWhenRemounted() {
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
                        sortedByRating
                        && (
                            sortedByRating
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
                books && books.length !== 0
                    ? books.sort(sorter).filter(filterHandler).map(({title, id, rating}) =>
                        (
                            <tr className="book-table-row"
                                key={id}
                            >
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{rating}</td>
                                <td>
                                    <ManageBooksButtons id={id!}/>
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

export default UserBookTable;