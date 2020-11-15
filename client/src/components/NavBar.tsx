import React, {MouseEvent} from "react";
import {Button, Form, FormControl, Image, Nav, Navbar} from "react-bootstrap";
import mordorLogo from '../mordor_logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import {RootState} from "../store/reducers";
import {useDispatch, useSelector} from "react-redux";
import {ICredentialState} from "../store/credential/credential.interfaces";
import {push} from "connected-react-router";
import {Roles} from "../../../interfaces";
import {ApplicationMap} from "../routes";
import {FaSearch} from "react-icons/fa"
import useWindowDimensions from "../hooks/useWindowDimensions";


const NavBar: React.FC = () => {

    const {authorised, roles,image} = useSelector<RootState, ICredentialState>(({credential}) => credential);
    const dispatch = useDispatch();
    const {windowDimensions: {width}, breakPoint} = useWindowDimensions();


    const pushHandler = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        const href: string | null = event.currentTarget.attributes.getNamedItem("href")!.value;
        if (href) {
            dispatch(push(href))
        }
    }

    const profileHandler = (event: MouseEvent) => {
        event.preventDefault()
        dispatch(push("/profile"))
    }

    const isAdmin = (role: Roles) => role.toUpperCase() === "ADMIN";
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img
                        src={mordorLogo}
                        width="50px"
                        height="50px"
                        className=""
                        alt="React Bootstrap logo"
                    />&nbsp;
                    Mordor
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href={ApplicationMap.MAIN_PAGE}
                              onClick={pushHandler}
                    >Main</Nav.Link>
                    {
                        authorised && width > breakPoint.sm
                        && <Nav.Link href={ApplicationMap.PROFILE_PAGE}
                                     onClick={pushHandler}
                        >Profile</Nav.Link>
                    }
                    {
                        authorised && roles?.some(isAdmin)
                        && <Nav.Link href={ApplicationMap.USERS_PAGE}
                                     onClick={pushHandler}
                        >Users</Nav.Link>
                    }
                </Nav>
                {
                    width > breakPoint.md
                        ? (
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                                <Button variant="outline-info">Search</Button>
                            </Form>
                        )
                        : (
                            <FaSearch style={{cursor: "pointer"}}/>
                        )
                }
                {authorised
                    ? (
                        <Image className="ml-4"
                               roundedCircle height="45px"
                               width="45px"
                               style={{cursor: 'pointer', objectFit: 'cover'}}
                               src={image}
                               onClick={profileHandler}
                        />
                    )
                    : (
                        <LinkContainer to={"/login"}>
                            <Button variant={"info"}
                                    className="ml-4"
                            >
                                Sign in
                            </Button>
                        </LinkContainer>
                    )
                }
            </Navbar>
        </>
    )
}

export default NavBar