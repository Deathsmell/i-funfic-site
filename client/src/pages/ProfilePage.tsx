import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AccountCard from "../components/ProfilePage/AccountCard";
import UserInfoTabs from "../components/ProfilePage/UserInfoTabs";
import {IBook} from "../../../interfaces";
import {IUserFromDb} from "../../../interfaces/IUser";

interface Props {
    myBook: IBook[],
    user: IUserFromDb
}

const ProfilePage: React.FC<Props> = ({
                                          myBook,
                                          user
                                      }) => {

    return (
        <Container className="mt-4">
            <Row>
                <Col xl={3}>
                    <AccountCard user={user}/>
                </Col>
                <Col xl={9}>
                    <UserInfoTabs user={user} books={myBook}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage;