import React,{MouseEvent} from "react";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {Button, Form, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {RootState} from "../../store/reducers";
import {change, login} from "../../store/auth/action"


const mapState = ({register}: RootState) => register
const mapDispatch = {login, change}
const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>


const LoginForm: React.FC<PropsFromRedux> = ({
                                                 children,
                                                 password,
                                                 username,
                                                 change,
                                                 login
                                             }) => {


    const dispatch = useDispatch();
    const loginHandler = async (event: MouseEvent) => {
        event.preventDefault()
        await dispatch(login({
            username,
            password
        }))
    }

    return (
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control type="text"
                              name="username"
                              placeholder="Username"
                              value={username}
                              onChange={change}
                />
                <Form.Text className="text-muted">
                    You can enter username or email address
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              name="password"
                              placeholder="Password"
                              value={password}
                              onChange={change}
                />
            </Form.Group>
            <Row className="justify-content-center">
                <Button className="col-6 "
                        variant="primary"
                        type="submit"
                        onClick={loginHandler}
                >
                    Sign in
                </Button>
            </Row>
            <hr/>
            <LinkContainer to={"/register"}>
                <div className="text-center">
                    You <strong>have</strong> account on owr site? <a href="/">Register</a>
                </div>
            </LinkContainer>
        </Form>
    )
}

export default connector(LoginForm);