import React, {ChangeEvent, MouseEvent, useState} from "react";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {Button, Form, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {login} from "../../store/credential/credential.actions"
import {FormattedMessage} from "react-intl";


const mapState = null
const mapDispatch = {login}
const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>


const LoginForm: React.FC<PropsFromRedux> = ({login}) => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const usernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

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
                <Form.Label>
                    <FormattedMessage id="authpage.login.fields.username"
                                      defaultMessage="Username or Email"
                                      description="Username or email field"
                    />
                </Form.Label>
                <Form.Control type="text"
                              name="username"
                              placeholder="Username"
                              value={username}
                              onChange={usernameHandler}
                />
                <Form.Text className="text-muted">
                    <FormattedMessage id="authpage.login.fields.username.muted"
                                      defaultMessage="You can enter username or email address"
                                      description="Username field bottom muted text"
                    />
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                    <FormattedMessage id="authpage.login.fields.password"
                                      defaultMessage="Password"
                                      description="Password field"
                    />
                </Form.Label>
                <Form.Control type="password"
                              name="password"
                              placeholder="Password"
                              value={password}
                              onChange={passwordHandler}
                />
            </Form.Group>
            <Row className="justify-content-center">
                <Button className="col-6 "
                        variant="primary"
                        type="submit"
                        onClick={loginHandler}
                >
                    <FormattedMessage id="authpage.login.button"
                                      defaultMessage="Log in"
                                      description="Log in button"
                    />
                </Button>
            </Row>
            <hr/>
            <div className="text-center">
                <FormattedMessage id="authpage.login.link.message"
                                  defaultMessage={"You {strong} account on owr site? {link}"}
                                  description="Registration link"
                                  values={{
                                      strong: (
                                          <strong>
                                              <FormattedMessage id={"authpage.login.link.strong"}
                                                                defaultMessage="have"
                                              />
                                          </strong>
                                      ),
                                      link: (
                                          <LinkContainer to={"/register"}>
                                              <a href={"/"}>
                                                  <FormattedMessage id={"authpage.login.link.link"}
                                                                    defaultMessage="Register"
                                                  />
                                              </a>
                                          </LinkContainer>
                                      )
                                  }}
                />
            </div>
        </Form>
    )
}

export default connector(LoginForm);