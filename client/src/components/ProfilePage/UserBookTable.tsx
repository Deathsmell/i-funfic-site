import React, {useState} from "react";
import {Table} from "react-bootstrap";
import ManageBookButtons from "./ManageBookButtons";
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa";

const UserBookTable: React.FC = () => {

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
            <tr className="book-table-row">
                <td>1</td>
                <td>Mordor</td>
                <td>1</td>
                <td>
                    <ManageBookButtons/>
                </td>
            </tr>
            </tbody>
        </Table>
    )
}

export default UserBookTable;