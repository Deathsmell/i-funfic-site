import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {Container, Row} from "react-bootstrap";
import LoginForm from "../../components/AuthPage/LoginForm";
import RegisterForm from "../../components/AuthPage/RegisterForm";
import SocialNetGroupIcons from "../../components/AuthPage/SocialNetGroupIcons";
import {FormattedMessage} from "react-intl";

const AuthPage: React.FC = () => {

    const [isLoginPage, setIsLogInPage] = useState(true);

    useEffect(function checkPathname() {
        const pathname = window.location.pathname;
        if (pathname === '/login') {
            setIsLogInPage(true)
        } else if (pathname === '/register') {
            setIsLogInPage(false)
        } else {
            console.error("Unknown state on page. Check AuthPage")
        }
    }, [window.location.pathname])

    return (
        <Row className="justify-content-center" style={{height: '85vh'}}>
            <Card className="col-6 align-self-center">
                <Container>
                    <h1 className="text-center mt-4">
                        {
                            isLoginPage
                                ? (
                                    <FormattedMessage id="authpage.login"
                                                      defaultMessage="Log in"
                                                      description="Log in liable"
                                    />
                                )
                                : (
                                    <FormattedMessage id="authpage.signup"
                                                      defaultMessage="Sign up"
                                                      description="Sign up liable"
                                    />
                                )
                        }
                    </h1>
                    {
                        isLoginPage
                        ? <LoginForm/>
                        : <RegisterForm/>
                    }
                    <SocialNetGroupIcons/>
                </Container>
            </Card>
        </Row>
    )
}

export default AuthPage;