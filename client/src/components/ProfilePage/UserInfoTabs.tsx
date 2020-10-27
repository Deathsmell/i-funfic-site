import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import UserBookTable from "./UserBookTable";
import BookTableSearcher from "./BookTableSearcher";

const UserInfoTabs: React.FC = () => {

    return (
        <Tabs defaultActiveKey="information" id="uncontrolled-tab-example">
            <Tab eventKey="information" title="Information">
                <h1>Information</h1>
            </Tab>
            <Tab eventKey="achieves" title="Achieves">
                <h1>Achieves</h1>
            </Tab>
            <Tab eventKey="table" title="Book table">
                <BookTableSearcher/>
                <UserBookTable/>
            </Tab>
        </Tabs>
    )
}

export default UserInfoTabs;