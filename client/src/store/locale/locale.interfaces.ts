import {SET_EN, SET_RU} from "./locale.types"
import locale_en from "../../locale/en.json"
import locale_ru from "../../locale/ru.json"

type Locales = { en: object, ru: object }

export const locales = {
    "en": locale_en,
    "ru": locale_ru
}

export interface LocaleAction {
    type: typeof SET_EN | typeof SET_RU
}

export type ILocaleState = keyof Locales