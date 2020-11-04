import React, {useState} from "react";
import {Table} from "react-bootstrap";
import ManageBookButtons from "./ManageBookButtons";
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa";
import {RootState} from "../../store/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getBooksByAuthorId} from "../../store/book/books.actions";


const mapProps = ({books}: RootState) => books
const mapDispatch = {getBooksByAuthorId}
const connector = connect(mapProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const UserBookTable: React.FC<PropsFromRedux> = ({
                                                     myBook
                                                 }) => {

    const arrow = {
        size: "15px",
    }

    const [sorted, setSorted] = useState(true);

    return (
        <Table striped bordered hover>
            <thead>
            <tr className="book-table-header">
                <th scope="col"
                    className="col-1 text-center"
                >
                    #
                    {
                        sorted
                            ? <FaLongArrowAltDown {...arrow}/>
                            : <FaLongArrowAltUp {...arrow}/>
                    }
                </th>
                <th scope="col"
                    className=""
                >
                    Book name
                    {
                        sorted
                            ? <FaLongArrowAltDown {...arrow}/>
                            : <FaLongArrowAltUp {...arrow}/>
                    }
                </th>
                <th scope="col"
                    className="col-2"
                >
                    Likes
                    {
                        sorted
                            ? <FaLongArrowAltDown {...arrow}/>
                            : <FaLongArrowAltUp {...arrow}/>
                    }
                </th>
                <th scope="col"
                    className="col-2"
                >
                    Manage
                </th>
            </tr>
            </thead>
            <tbody className="text-center">
            {
                myBook && myBook.length !== 0
                    ? myBook.map(({title,id,rating}) =>
                        (
                            <tr className="book-table-row">
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