import React, {MouseEvent} from "react";
import moment from "moment";
import {Container, Table} from "react-bootstrap";
import {IChapter} from "../../../../interfaces";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import {ApplicationDynamicMap} from "../../routes";
import ChapterManagerButtons from "./ChapterManagerButtons";
import {FormattedMessage} from "react-intl";

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
                        <h3>
                            <FormattedMessage id="listchapter.table.header"
                                              defaultMessage="Chapters table"
                                              description="List chapter table header"
                            />
                        </h3>
                    </th>
                </tr>
                <tr>
                    <th className={"col-1"}>
                        <FormattedMessage id="listchapter.table.header.number"
                                          defaultMessage="№"
                                          description="List chapter table cell number"
                        />
                    </th>
                    <th className={"col-6"}>
                        <FormattedMessage id="listchapter.table.header.name"
                                          defaultMessage="Chapter name"
                                          description="List chapter table cell name"
                        />
                    </th>
                    <th>
                        <FormattedMessage id="listchapter.table.header.update"
                                          defaultMessage="Last update"
                                          description="List chapter table cell update"
                        />
                    </th>
                    <th>
                        <FormattedMessage id="listchapter.table.header.action"
                                          defaultMessage="Action"
                                          description="List chapter table cell action"
                        />
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    chapters && chapters.map(({number, title,bookId,updatedAt}) => {
                            return (
                                <tr key={number + title}>
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
                    >
                        <FormattedMessage id="listchapter.table.row.add"
                                          defaultMessage="Add new chapter"
                                          description="List chapter table add chapter row"
                        />
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default ListChapters