import {IGenresAction, IGenresState} from "./genres.interfaces";
import {SET_GENRES} from "./genres.types";


const initialState: IGenresState = []


export const genresReducer = (
    state: IGenresState = initialState,
    action: IGenresAction
) => {
    switch (action.type) {
        case SET_GENRES:
            return action.genres
        default:
            return state
    }
}

export type GenresReducer = typeof genresReducer