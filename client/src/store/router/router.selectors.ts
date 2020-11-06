import {createSelector} from "reselect";
import {RootState} from "../reducers";


const selectRouter = (state:RootState) => state.router

export const selectorHash = createSelector(
    selectRouter,
    router => router.location.hash
)