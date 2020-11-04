import {ICredentialAction, ICredentialState} from "./credential.interfaces";
import {AUTHORISE, CLEAR_CREDENTIAL} from "./credential.costants";

const initialState: ICredentialState = {
    authorised: false,
}

export const credentialReducer = (
    state: ICredentialState = initialState,
    action: ICredentialAction
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

export type CredentialReducer = typeof credentialReducer


// const initialState: RegistrationData = {
//     username: "",
//     email: "",
//     password: "",
// }
//
// export const authFieldsReducer = (
//     state: RegistrationData = initialState,
//     action: IChangeFieldAction): RegistrationData => {
//     switch (action.type) {
//         case CHANGE_FIELD:
//             return {
//                 ...state,
//                 ...action.payload
//             }
//         case CLEAR_FIELD:
//             return {
//                 email: "",
//                 password: "",
//                 username: "",
//             }
//         default:
//             return state
//     }
// }
//
// export type AuthFieldsReducer = typeof authFieldsReducer