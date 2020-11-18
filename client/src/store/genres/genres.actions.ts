import {IGenresAction, IGenresAsyncAction, IGenresState} from "./genres.interfaces";
import {GET_GENRES, SET_GENRES} from "./genres.types";


export const getGenres = (): IGenresAsyncAction => ({
    type: GET_GENRES
})

export const setGenres = (genres: IGenresState): IGenresAction => ({
    type: SET_GENRES,
    genres: genres
})
