import React, {useEffect} from "react";
import {authRedirect} from "../store/credential/credential.actions";
import {useDispatch} from "react-redux";

const AuthRedirect: React.FC = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authRedirect())
    })

    return null

}

export default AuthRedirect