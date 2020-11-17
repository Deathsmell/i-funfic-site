import React, {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import UserBookTable from "./UserBookTable";
import BookTableSearcher, {FilterKeys} from "./BookTableSearcher";
import {IUser} from "../../../../interfaces";
import InformationTab from "./UserInfoTabs/InformationTab";
import {IBookFromDb} from "../../../../interfaces/IBook";
import {FormattedMessage} from "react-intl";

export interface IFilterBookTableState {
    type: FilterKeys,
    string: string
}

interface Props {
    user: IUser,
    books: IBookFromDb[]
}

const UserProfileTabs: React.FC<Props> = ({
                                              books,
                                              user,
                                          }) => {

    const filterState = useState<IFilterBookTableState>({type: "all", string: ""});

    return (
        <Tabs defaultActiveKey="information" id="uncontrolled-tab-example">
            <Tab eventKey="information" title={
                <FormattedMessage id="account.tabs.information.header"
                                  defaultMessage="Information"
                                  description="Header information tab"
                />
            }>
                <InformationTab user={user}/>
            </Tab>
            <Tab eventKey="achieves" title={
                <FormattedMessage id="account.tabs.achieves.header"
                                  defaultMessage="Achieves"
                                  description="Header achieves tab"
                />
            }>
                <h1>Achieves</h1>
            </Tab>
            <Tab eventKey="table" title={
                <FormattedMessage id="account.tabs.table.header"
                                  defaultMessage="Achieves"
                                  description="Header achieves tab"
                />
            }>
                <BookTableSearcher filterState={filterState}/>
                <UserBookTable books={books} filterState={filterState}/>
            </Tab>
        </Tabs>
    )
}

export default UserProfileTabs;