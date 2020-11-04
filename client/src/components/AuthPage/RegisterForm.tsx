import React, {ChangeEvent, MouseEvent, useState} from "react";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {registration} from "../../store/credential/credential.actions"
import {Button, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const mapState = null
const mapDispatch = {registration}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

const RegisterForm: React.FC<PropsFromRedux> = ({registration}) => {

    const dispatch = useDispatch();
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("");

    const usernameHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const registrationHandler = async (e: MouseEvent) => {
        e.preventDefault()
        dispatch(registration({
            password,
            email,
            username,
        }));
    }

    return (
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username"
                              name="username"
                              value={username}
                              placeholder="Username"
                              onChange={usernameHandler}
                />
                <Form.Text className="text-muted">
                    Enter you username
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                              name="email"
                              value={email}
                              placeholder="Enter email"
                              onChange={emailHandler}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              name="password"
                              value={password}
                              placeholder="Password"
                              onChange={passwordHandler}
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