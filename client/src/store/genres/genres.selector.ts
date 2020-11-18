import {createSelector} from "reselect";
import {RootState} from "../reducers";


const selectGenres = (root: RootState) => root.genres

export const selectorGenres = createSelector(
    selectGenres,
    genres => genres
)