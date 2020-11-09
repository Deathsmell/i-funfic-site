import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AccountCard from "../components/ProfilePage/AccountCard";
import UserInfoTabs from "../components/ProfilePage/UserInfoTabs";
import {IBook, IUser} from "../../../interfaces";

interface Props {
    myBook: IBook[],
    user: IUser
}

const ProfilePage: React.FC<Props> = ({
                                          myBook,
                                          user
                                      }) => {

    return (
        <Container className="mt-4">
            <Row>
                <Col className="col-3">
                    <AccountCard user={user}/>
                </Col>
                <Col className="col-9">
                    <UserInfoTabs user={user} books={myBook}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage;