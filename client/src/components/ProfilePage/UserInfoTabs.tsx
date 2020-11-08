import React, {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import UserBookTable from "./UserBookTable";
import BookTableSearcher, {FilterKeys} from "./BookTableSearcher";
import {ICredentialState} from "../../store/credential/credential.interfaces";
import {IBook} from "../../../../interfaces";

export interface IFilterBookTableState {
    type: FilterKeys,
    string: string
}

interface Props {
    credential: ICredentialState,
    books: IBook[]
}

const UserInfoTabs: React.FC<Props> = ({
                                           books,
                                           credential
                                       }) => {

    const filterState = useState<IFilterBookTableState>({type: "all", string: ""});

    return (
        <Tabs defaultActiveKey="information" id="uncontrolled-tab-example">
            <Tab eventKey="information" title="Information">
                <h1>Information</h1>
            </Tab>
            <Tab eventKey="achieves" title="Achieves">
                <h1>Achieves</h1>
            </Tab>
            <Tab eventKey="table" title="Book table">
                <BookTableSearcher filterState={filterState}/>
                <UserBookTable books={books} filterState={filterState}/>
            </Tab>
        </Tabs>
    )
}

export default UserInfoTabs;