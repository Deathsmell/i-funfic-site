import React from "react";
import {Button, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const RegisterForm: React.FC = () => {


    return (
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Username"/>
                <Form.Text className="text-muted">
                    Enter you username
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
            <Row className="justify-content-center">
                <Button className="col-6 " variant="primary" type="submit">
                    Sign up
                </Button>
            </Row>
            <hr/>
            <LinkContainer to={"/login"}>
                <div className="text-center">
                    You <strong>haven't</strong> account on owr site? <a href="/">Log in</a>
                </div>
            </LinkContainer>
        </Form>
    )
}

export default RegisterForm;