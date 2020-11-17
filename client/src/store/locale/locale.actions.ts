import {LocaleAction} from "./locale.interfaces";
import {SET_EN, SET_RU} from "./locale.types";


export const setEnLocale = ():LocaleAction => ({
    type: SET_EN
})

export const setRuLocale = ():LocaleAction => ({
    type: SET_RU
})