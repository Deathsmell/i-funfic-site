import {useEffect} from "react";
import {ISubscribeBookMessage} from "../../../interfaces"
import {IWSCommentMessage, IWSMessage} from "../../../interfaces";
import {useDispatch, useSelector} from "react-redux";
import {selectorWebsocket} from "../store/websocket/websocket.selector";
import {connecting} from "../store/websocket/websocket.actions";
import {IUserComment} from "../../../interfaces";
import {selectorAuthorise, selectorUserId} from "../store/credential/credential.selectors";

export const useWS = () => {

    const ws = useSelector(selectorWebsocket);
    const authorise = useSelector(selectorAuthorise);
    const userId = useSelector(selectorUserId);
    const dispatch = useDispatch();
    const handlers: Function[] = []

    useEffect(function () {
        if (!authorise) return
        if (ws === null) {
            dispatch(connecting())
        }
        if (ws) {
            ws.onmessage = ({data}) => {
                try {
                    const {comment} = JSON.parse(data) as IWSCommentMessage;
                    if (comment && handlers.length) {
                        handlers.forEach((handler) => {
                            handler(comment)
                        })
                    } else console.error("EMPTY HANDLER")
                } catch (e) {
                    console.error(e.message)
                }
            }
        }
    }, [ws])

    const sendMessage = (message: IWSMessage) => ws?.send(JSON.stringify(message))

    const subscribeOnComment = (bookId: number, handler: (comment: IUserComment) => void) => {
        if (ws && userId) {
            handlers.push(handler)
            const message: ISubscribeBookMessage = {type: "subscribe", id: userId, bookId}
            sendMessage(message)
        } else {
            console.error("DONT SUBSCRIBED!!!!")
        }
    }

    return {subscribeOnComment}
}