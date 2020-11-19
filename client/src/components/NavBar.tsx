import React, {MouseEvent} from "react";
import {FormattedMessage} from "react-intl";
import {Button, Form, FormControl, Image, Nav, Navbar} from "react-bootstrap";
import mordorLogo from '../mordor_logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import {RootState} from "../store/reducers";
import {connect, ConnectedProps, useDispatch, useSelector} from "react-redux";
import {ICredentialState} from "../store/credential/credential.interfaces";
import {push} from "connected-react-router";
import {Roles} from "../../../interfaces";
import {ApplicationMap} from "../routes";
import {FaSearch} from "react-icons/fa"
import useWindowDimensions from "../hooks/useWindowDimensions";
import {ILocaleState} from "../store/locale/locale.interfaces";
import {setEnLocale, setRuLocale} from "../store/locale/locale.actions";
import useDarkTheme from "../hooks/theme.hook";

const mapState = ({locale}: RootState): { locale: ILocaleState } => ({locale})
const mapDispatch = {setEn: setEnLocale, setRu: setRuLocale}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>


const NavBar: React.FC<PropsFromRedux> = ({locale, setRu, setEn}) => {

    const {authorised, roles, image} = useSelector<RootState, ICredentialState>(({credential}) => credential);
    const dispatch = useDispatch();
    const {windowDimensions: {width}, breakPoint} = useWindowDimensions();
    const {changeTheme,theme} = useDarkTheme();

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

    const changeLocaleHandler = (e: MouseEvent) => {
        e.preventDefault()
        if (locale === "en") {
            dispatch(setRu())
        } else {
            dispatch(setEn())
        }
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
                    <FormattedMessage id="navbar.brand"
                                      defaultMessage="Mordor"
                                      description="Site name"
                    />
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href={ApplicationMap.MAIN_PAGE}
                              onClick={pushHandler}
                    >
                        <FormattedMessage id="navbar.links.main"
                                          defaultMessage="Main"
                                          description="Main page link"
                        />
                    </Nav.Link>
                    {
                        authorised && width > breakPoint.sm
                        && <Nav.Link href={ApplicationMap.PROFILE_PAGE}
                                     onClick={pushHandler}
                        >
                            <FormattedMessage id="navbar.links.profile"
                                              defaultMessage="Profile"
                                              description="Profile page link"
                            />
                        </Nav.Link>
                    }
                    {
                        authorised && roles?.some(isAdmin)
                        && <Nav.Link href={ApplicationMap.USERS_PAGE}
                                     onClick={pushHandler}
                        >
                            <FormattedMessage id="navbar.links.users"
                                              defaultMessage="Profile"
                                              description="Users page link"
                            />
                        </Nav.Link>
                    }
                </Nav>
                {
                    width > breakPoint.md
                        ? (
                            <Form inline className="mr-4">
                                <FormControl type="text" placeholder="Search" className="mr-2"/>
                                <Button variant="outline-info"

                                >
                                    <FormattedMessage id="navbar.links.search"
                                                      defaultMessage="Search"
                                                      description="Search field"
                                    />
                                </Button>
                            </Form>
                        )
                        : (
                            <FaSearch className="mr-2" style={{cursor: "pointer"}}/>
                        )
                }
                <div className="custom-control custom-switch">
                    <input type="checkbox"
                           className="custom-control-input"
                           id="theme-switcher"
                           checked={theme === "dark"}
                    />
                    <label className="custom-control-label"
                           htmlFor="theme-switcher"
                           id="theme-switcher-label"
                           style={{cursor: "pointer"}}
                           onClick={changeTheme}
                    >
                    </label>
                </div>

                <span className="text-white"
                      style={{cursor: "pointer", textDecoration: "underline"}}
                      onClick={changeLocaleHandler}
                >
                    {locale.toUpperCase()}
                </span>
                {authorised
                    ? (
                        <Image className="ml-2"
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
                                    className="ml-2"
                            >
                                <FormattedMessage id="navbar.links.login"
                                                  defaultMessage="Log in"
                                                  description="Login button"
                                />
                            </Button>
                        </LinkContainer>
                    )
                }
            </Navbar>
        </>
    )
}

export default connector(NavBar)