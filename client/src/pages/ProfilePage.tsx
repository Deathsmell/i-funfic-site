import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AccountCard from "../components/AccountCard";
import UserInfoTabs from "../components/UserInfoTabs";


const ProfilePage: React.FC = () => {


    return (
        <Container className="mt-4">
            <Row>
                <Col className="col-3">
                    <AccountCard/>
                </Col>
                <Col className="col-9">
                    <UserInfoTabs/>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage;