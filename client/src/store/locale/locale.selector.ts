import {createSelector} from "reselect";
import {RootState} from "../reducers";


const selectLocale = (state:RootState) => state.locale

export const selectorLocale = createSelector(
    selectLocale,
    locale => locale
)