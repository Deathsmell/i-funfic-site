import React, {ChangeEvent, FocusEvent, MouseEvent, useState} from "react";
import {IUser} from "../../../../../interfaces";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectorRoles} from "../../../store/credential/credential.selectors";
import {isAdmin} from "../../../utils/adminUtils";
import {AdminApi, UserApi} from "../../../api";
import {FormattedMessage} from "react-intl";

interface Props {
    user: IUser
}

const blackList: Array<keyof IUser> = ["id", "confirm", "blocked", "roles", "password"]

const setPlaintextClass = (e: EventTarget & HTMLInputElement) => e.className = "form-control-plaintext"
const setFormControlClass = (e: EventTarget & HTMLInputElement) => e.className = "form-control"

const InformationTab: React.FC<Props> = ({user}) => {


    const [editing, setEditing] = useState<boolean>(false);
    const [userField, setUserField] = useState<IUser>(user);
    const roles = useSelector(selectorRoles);

    const onMouseEnterHandler = (e: MouseEvent<HTMLInputElement>) => {
        setFormControlClass(e.currentTarget)
    }

    const onMouseLeaveHandler = (e: MouseEvent<HTMLInputElement>) => {
        if (e.currentTarget.readOnly) {
            setPlaintextClass(e.currentTarget)
        }
    }

    const onDoubleClickHandler = (e: MouseEvent<HTMLInputElement>) => {
        e.currentTarget.readOnly = false
        setEditing(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserField(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        let target = e.currentTarget
        const equalField = user[target.name as keyof IUser]?.toString() === target.value;
        if (equalField) {
            setPlaintextClass(target)
            e.currentTarget.readOnly = true
        }
    }

    const submitHandler = () => {
        !isAdmin(roles)
            ? UserApi.update(userField)
            : AdminApi.updateUserProfile(userField)
    }

    return (
        <div className="ml-3">
            <h1>
                <FormattedMessage id="account.tabs.information.header"
                                  defaultMessage="Information"
                                  description="Header information tab"
                />
            </h1>
            <Form>
                {
                    userField && Object.entries(userField)
                        .filter((filed) => {
                            return !isAdmin(roles)
                                // @ts-ignore
                                ? !blackList.includes(filed[0])
                                : true
                        })
                        .map(([fildname, value]) => {
                            return (
                                <Form.Group as={Row}
                                            key={fildname}
                                            controlId={"formPlaintext" + fildname}
                                >
                                    <Form.Label column sm="2">
                                        {fildname.charAt(0).toUpperCase() + fildname.slice(1)}
                                    </Form.Label>
                                    <Col sm="10">
                                        {
                                            (typeof value === "string" || typeof value === "number")
                                            && (
                                                <Form.Control readOnly
                                                              plaintext
                                                              value={value}
                                                              name={fildname}
                                                              onMouseEnter={onMouseEnterHandler}
                                                              onMouseLeave={onMouseLeaveHandler}
                                                              onDoubleClick={onDoubleClickHandler}
                                                              onChange={onChangeHandler}
                                                              onBlur={onBlurHandler}
                                                />
                                            )
                                        }
                                        {
                                            (typeof value === "boolean")
                                            && (
                                                <Form.Check type="checkbox"
                                                            disabled
                                                            name={fildname}
                                                            checked={value}
                                                            label={user[fildname as keyof IUser]?.toString()}
                                                />
                                            )
                                        }
                                        {
                                            (fildname === "roles" && value !== null)
                                            && (
                                                <div>{Object.values(value).map((val) => {
                                                    return ` ${val} `
                                                })}</div>
                                            )
                                        }
                                    </Col>
                                </Form.Group>
                            )
                        })
                }
                {
                    editing && (
                        <Row className="justify-content-center">
                            <Button onClick={submitHandler}>
                                <FormattedMessage id="account.tabs.information.button.save"
                                                  defaultMessage="Save changes"
                                                  description="Save changes button"
                                />
                            </Button>
                        </Row>
                    )
                }
            </Form>
        </div>
    )
}

export default InformationTab