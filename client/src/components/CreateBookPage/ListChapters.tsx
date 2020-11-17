import React, {MouseEvent} from "react";
import moment from "moment";
import {Container, Table} from "react-bootstrap";
import {IChapter} from "../../../../interfaces";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";
import ChapterManagerButtons from "./ChapterManagerButtons";

interface Props {
    chapters?: IChapter[]
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
                    chapters && chapters.map(({number, title,bookId,updatedAt}) => {
                            return (
                                <tr key={number}>
                                    <td>{number}</td>
                                    <td>{title}</td>
                                    <td>{moment(updatedAt).fromNow()}</td>
                                    <td>
                                        <ChapterManagerButtons bookId={bookId}/>
                                    </td>
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