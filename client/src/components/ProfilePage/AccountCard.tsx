import React, {MouseEvent} from "react";
import {AiOutlineUser} from "react-icons/ai";
import {Button, ButtonGroup} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {logout} from "../../store/credential/credential.actions";
import {push} from "connected-react-router";

const AccountCard: React.FC = () => {


    const dispatch = useDispatch();
    const logoutHandler = (event: MouseEvent) => {
        event.preventDefault()
        dispatch(logout())
    }

    const createBookHandler = (event: MouseEvent) => {
        event.preventDefault()
        dispatch(push("/create"))
    }

    const settingHandler = (e : MouseEvent) => {
        e.preventDefault()
    }

    return (
        <div>
            <div className="border border-dark "
                 style={{width: '15em', height: '15em', backgroundColor: 'grey'}}
            >
                <AiOutlineUser size="15em" color="white"/>
            </div>
            <hr/>
            <h1 className="text-center">Username</h1>
            <ButtonGroup vertical className="w-100">
                <Button variant="dark"
                        onClick={createBookHandler}
                >Create new book</Button>
                <Button variant="dark"
                        onClick={settingHandler}
                >Setting</Button>
                <Button variant="danger"
                        onClick={logoutHandler}
                >Log out</Button>
            </ButtonGroup>
        </div>
    )
}

export default AccountCard;