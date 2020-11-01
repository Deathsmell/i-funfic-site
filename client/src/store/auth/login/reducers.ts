import {AUTHORISE, IAuthActions, IAuthorised} from "./types";


const initialState: IAuthorised = {
    authorised: false,
}

export const AuthReducer = (
    state: IAuthorised = initialState,
    action: IAuthActions
): IAuthorised => {
    switch (action.type) {
        case AUTHORISE:
            return action.payload
        default:
            return state
    }
}