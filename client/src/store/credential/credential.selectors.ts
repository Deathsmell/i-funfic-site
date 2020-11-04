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