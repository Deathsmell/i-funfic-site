import {ICommentAction, ICommentsAction, ICommentsState} from "./comments.interfaces";
import {ADD_COMMENT, SET_COMMENTS} from "./comments.constants";


const initialState: ICommentsState = []

export const commentsReducers = (
    state: ICommentsState = initialState,
    action: ICommentAction | ICommentsAction,
): ICommentsState => {
    switch (action.type) {
        case ADD_COMMENT:
            return [
                ...state.filter(({id}) => id !== action.comment.id),
                action.comment
            ]
        case SET_COMMENTS:
            return action.comments
        default:
            return state
    }
}

export type CommentsReducer = typeof commentsReducers
