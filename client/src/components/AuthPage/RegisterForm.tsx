import React, {MouseEvent} from "react";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/reducers"
import {change, registration} from "../../store/auth/action"
import {Button, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const mapState = ({register}: RootState) => register
const mapDispatch = {registration, change}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

const RegisterForm: React.FC<PropsFromRedux> = ({
                                                    children,
                                                    ...props
                                                }) => {
    const dispatch = useDispatch();
    const registrationHandler = async (e: MouseEvent) => {
        e.preventDefault()
        dispatch(registration({
            password: props.password,
            email: props.email,
            username: props.username
        }));
    }

    return (
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username"
                              name="username"
                              value={props.username}
                              placeholder="Username"
                              onChange={props.change}
                />
                <Form.Text className="text-muted">
                    Enter you username
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                              name="email"
                              value={props.email}
                              placeholder="Enter email"
                              onChange={props.change}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              name="password"
                              value={props.password}
                              placeholder="Password"
                              onChange={props.change}
                />
            </Form.Group>
            <Row className="justify-content-center">
                <Button className="col-6 "
                        variant="primary"
                        type="submit"
                        onClick={registrationHandler}
                >
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

export default connector(RegisterForm);