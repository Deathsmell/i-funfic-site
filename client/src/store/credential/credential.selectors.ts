import {createSelector} from "reselect";
import {RootState} from "../reducers";

const selectCredential = (state: RootState) => state.credential

export const selectorUserId = createSelector(
    selectCredential,
    credential => credential.id
)

export const selectorUsername = createSelector(
    selectCredential,
    credential => credential.username
)

export const selectorAuthorise = createSelector(
    selectCredential,
    credential => credential.authorised
)

export const selectorToken = createSelector(
    selectCredential,
    credential => credential.token
)

export const selectorRoles = createSelector(
    selectCredential,
    credential => credential.roles
)

export const selectorImage = createSelector(
    selectCredential,
    credential => credential.image
)