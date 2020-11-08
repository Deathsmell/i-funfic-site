import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AccountCard from "../components/ProfilePage/AccountCard";
import UserInfoTabs from "../components/ProfilePage/UserInfoTabs";
import {IBook, IUser, Roles} from "../../../interfaces";
import {ICredentialState} from "../store/credential/credential.interfaces";

interface Props {
    myBook: IBook[],
    credential: ICredentialState,
    user?: IUser
}
const isAdmin = (roles?:Roles[]):boolean => roles?.includes("ADMIN" as Roles) || false;

const ProfilePage: React.FC<Props> = ({
                                          myBook,
                                          credential,
                                          user
                                      }) => {

    return (
        <Container className="mt-4">
            <Row>
                <Col className="col-3">
                    <AccountCard isAdmin={isAdmin(credential?.roles)} user={user}/>
                </Col>
                <Col className="col-9">
                    <UserInfoTabs credential={credential} books={myBook}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage;