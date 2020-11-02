import {AUTHORISE, IAuthActions, ICredentialState} from "./types";
import {CLEAR_CREDENTIAL} from "../types";


const initialState: ICredentialState = {
    authorised: false,
}

export const authReducer = (
    state: ICredentialState = initialState,
    action: IAuthActions
): ICredentialState => {
    switch (action.type) {
        case AUTHORISE:
            return action.payload
        case CLEAR_CREDENTIAL:
            return initialState
        default:
            return state
    }
}

export type AuthReducer = typeof authReducer