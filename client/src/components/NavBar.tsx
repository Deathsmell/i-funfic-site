import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import mordorLogo from '../mordor_logo.png'
import {LinkContainer} from 'react-router-bootstrap'


const NavBar: React.FC = () => {

    let src = 'https://avatars.mds.yandex.net/get-pdb/1976636/ac1ce1a1-c9a4-4355-9a49-73627c1b9aab/s1200';

    const isAuthorize: boolean = false

    return (
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
                <Nav.Link href="/">Main</Nav.Link>
                <Nav.Link href="/profile" disabled>Profile</Nav.Link>
                <Nav.Link href="/users" disabled>Users</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                <Button variant="outline-info">Search</Button>
            </Form>
            {isAuthorize
                ? (
                    <Image className="ml-4"
                           roundedCircle height="45px"
                           width="45px"
                           style={{cursor: 'pointer', objectFit: 'cover'}}
                           src={src}/>
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
    )
}

export default NavBar