import React, {useState,ChangeEvent,MouseEvent} from "react";
import {Button, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {IUser} from "../../../../interfaces";
import {useHttp} from "../../hooks/http.hook";

const RegisterForm: React.FC = () => {

    const {request} = useHttp();
    const [form, setForm] = useState<IUser>({
        username: "",
        email: "",
        password: "",
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm(prev => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            }
        )
    }

    const registrationHandler = async (e: MouseEvent) => {
        e.preventDefault()
        console.log(form)
        const response = await request({
            url: "http://localhost:5000/user/create",
            method: "post",
            data: form
        });
        console.log(response.message)
    }

    return (
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username"
                              name="username"
                              placeholder="Username"
                              onChange={changeHandler}
                />
                <Form.Text className="text-muted">
                    Enter you username
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                              name="email"
                              placeholder="Enter email"
                              onChange={changeHandler}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              name="password"
                              placeholder="Password"
                              onChange={changeHandler}
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

export default RegisterForm;