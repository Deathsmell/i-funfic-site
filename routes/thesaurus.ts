import {IRouter} from "express"
import ThesaurusController from "../controllers/ThesaurusController";
import {THESAURUS_SEARCH_URL} from "../api";

export const thesaurusRouter = (router: IRouter) => {
    router.get(THESAURUS_SEARCH_URL, ThesaurusController.search)
}

