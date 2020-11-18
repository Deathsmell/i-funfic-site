import {GET_GENRES, SET_GENRES} from "./genres.types";


export type IGenresState = string[]

export interface IGenresAction {
    type: typeof SET_GENRES,
    genres: IGenresState
}

export interface IGenresAsyncAction {
    type: typeof GET_GENRES
}