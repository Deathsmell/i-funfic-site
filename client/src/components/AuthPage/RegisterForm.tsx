import React, {ChangeEvent, MouseEvent, useState} from "react";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {registration} from "../../store/credential/credential.actions"
import {Button, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FormattedMessage} from "react-intl";

const mapState = null
const mapDispatch = {registration}
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

const RegisterForm: React.FC<PropsFromRedux> = ({registration}) => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("");

    const usernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
                <Form.Label>
                    <FormattedMessage id="authpage.register.fields.username"
                                      defaultMessage="Username"
                                      description="Username field"
                    />
                </Form.Label>
                <Form.Control type="username"
                              name="username"
                              value={username}
                              placeholder="Username"
                              onChange={usernameHandler}
                />
                <Form.Text className="text-muted">
                    <FormattedMessage id="authpage.register.fields.username.muted"
                                      defaultMessage="Enter you username"
                                      description="Username bottom muted text"
                    />
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>
                    <FormattedMessage id="authpage.register.fields.email"
                                      defaultMessage="Email address"
                                      description="Email address field"
                    />
                </Form.Label>
                <Form.Control type="email"
                              name="email"
                              value={email}
                              placeholder="Enter email"
                              onChange={emailHandler}
                />
                <Form.Text className="text-muted">
                    <FormattedMessage id="authpage.register.fields.email.muted"
                                      defaultMessage="We'll never share your email with anyone else"
                                      description="Email bottom muted text"
                    />
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                    <FormattedMessage id="authpage.register.fields.password"
                                      defaultMessage="Password"
                                      description="Password field"
                    />
                </Form.Label>
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
                    <FormattedMessage id="authpage.register.button"
                                      defaultMessage="Sign up"
                                      description="Sign up button"
                    />
                </Button>
            </Row>
            <hr/>
            <div className="text-center">
                <FormattedMessage id="authpage.register.link.message"
                                  defaultMessage={"You {strong} account on owr site? {link}"}
                                  description="Log in link"
                                  values={{
                                      strong: (
                                          <strong>
                                              <FormattedMessage id={"authpage.register.link.strong"}
                                                                defaultMessage="haven't"
                                              />
                                          </strong>
                                      ),
                                      link: (
                                          <LinkContainer to={"/login"}>
                                              <a href={"/"}>
                                                  <FormattedMessage id={"authpage.register.link.link"}
                                                                    defaultMessage="Log in"
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

export default connector(RegisterForm);