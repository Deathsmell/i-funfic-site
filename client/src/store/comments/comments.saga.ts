import {AxiosResponse} from "axios"
import {call, put, takeEvery} from "redux-saga/effects"
import {
    ICommentAction,
    ICommentFetchAction,
    ICommentsAction,
    ICommentsFetchActionByBookId
} from "./comments.interfaces";
import {CommentApi} from "../../api/comment";
import {addComment, setComments} from "./comments.actions";
import {IUserCommentResponse, IUserCommentsResponse} from "../../../../interfaces/IResponse";
import {CREATE_COMMENT, GET_COMMENTS_BY_BOOK_ID} from "./comments.constants";


function* createWorker(action: ICommentFetchAction) {
    try {
        const {data: {comment}}: AxiosResponse<IUserCommentResponse> = yield call(CommentApi.create, action.comment);
        yield put<ICommentAction>(addComment(comment))
    } catch (e) {
        console.error(e)
    }
}

function* getByBookIdWorker(action: ICommentsFetchActionByBookId) {
    try {
        const {data: {comments}}: AxiosResponse<IUserCommentsResponse> =
            yield call(CommentApi.getAllByBookId, action.id);
        console.log(comments)
        yield put<ICommentsAction>(setComments(comments))
    } catch (e) {
        console.error(e)
    }
}

export default function* watcher() {
    yield takeEvery<ICommentFetchAction>(CREATE_COMMENT, createWorker)
    yield takeEvery<ICommentsFetchActionByBookId>(GET_COMMENTS_BY_BOOK_ID, getByBookIdWorker)
}