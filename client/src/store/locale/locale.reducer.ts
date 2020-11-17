import {ILocaleState, LocaleAction} from "./locale.interfaces";
import {SET_EN, SET_RU} from "./locale.types";
import moment from "moment";


const initialState: ILocaleState = "en"


export const localeReducer = (
    state: ILocaleState = initialState,
    action: LocaleAction
): ILocaleState => {
    switch (action.type) {
        case SET_EN:
            moment.locale("en")
            return "en"
        case SET_RU:
            moment.locale("ru")
            return "ru"
        default:
            return state
    }
}

export type LocaleReducer = typeof localeReducer