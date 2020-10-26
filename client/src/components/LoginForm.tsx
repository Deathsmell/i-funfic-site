import React from "react";
import {Button, Form, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'


const LoginForm: React.FC = () => {


    return (
        <Form className="mb-5">
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control type="text" placeholder="Username"/>
                <Form.Text className="text-muted">
                    You can enter username or email address
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
            <Row className="justify-content-center">
                <Button className="col-6 " variant="primary" type="submit">
                    Sign in
                </Button>
            </Row>
            <hr/>
            <LinkContainer to={"/register"}>
                <div className="text-center">
                    You <strong>have</strong> account on owr site? <a href="">Register</a>
                </div>
            </LinkContainer>
        </Form>
    )
}

export default LoginForm;