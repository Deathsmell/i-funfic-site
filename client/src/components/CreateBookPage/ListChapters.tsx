import React, {MouseEvent} from "react";
import {Container, Table} from "react-bootstrap";
import {IBookChapter} from "../../../../interfaces";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";

interface Props {
    chapters?: IBookChapter[]
    bookId: number
}

const ListChapters: React.FC<Props> = ({
                                           chapters,
                                           bookId
                                       }) => {


    const dispatch = useDispatch();

    const createChapterHandler = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(push(ApplicationDynamicMap.createChapterPage(bookId)))
    }

    return (
        <Container className={"mt-5"}>
            <Table
                bordered
                hover
            >
                <thead>
                <tr className="text-center">
                    <th colSpan={4}>
                        <h3>Chapters table</h3>
                    </th>
                </tr>
                <tr>
                    <th className={"col-1"}>#</th>
                    <th className={"col-6"}>Chapter name</th>
                    <th>Last update</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    chapters && chapters.map(({number, title}) => {
                            return (
                                <tr>
                                    <td>{number}</td>
                                    <td>{title}</td>
                                    <td>1 minute ago</td>
                                    <td>@action</td>
                                </tr>
                            )
                        }
                    )
                }
                <tr>
                    <td colSpan={4}
                        className={"text-center"}
                        onClick={createChapterHandler}
                    >Add new chapter
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default ListChapters