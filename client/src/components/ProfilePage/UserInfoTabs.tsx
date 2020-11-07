import React, {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import UserBookTable from "./UserBookTable";
import BookTableSearcher, {FilterKeys} from "./BookTableSearcher";

export interface IFilterBookTableState {
    type: FilterKeys,
    string: string
}

const UserInfoTabs: React.FC = () => {

    const filterState = useState<IFilterBookTableState>({type: "all", string:""});

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
                <UserBookTable filterState={filterState}/>
            </Tab>
        </Tabs>
    )
}

export default UserInfoTabs;