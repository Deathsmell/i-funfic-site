import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AccountCard from "../components/ProfilePage/AccountCard";
import UserProfileTabs from "../components/ProfilePage/UserProfileTabs";
import {IUserFromDb} from "../../../interfaces/IUser";
import {IBookFromDb} from "../../../interfaces/IBook";

interface Props {
    myBook: IBookFromDb[],
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
                    <UserProfileTabs user={user} books={myBook}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage;