import WebSocket, {Server} from "ws"
import {IWSCommentMessage, IWSMessage, SUBSCRIBE} from "../interfaces/IWSMessage";
import {IUserComment} from "../interfaces/IComment";

type WSSessionStore = Array<{ session: WebSocket, bookId: number, id: number }>;

let websocketSessionStore: WSSessionStore = []

export const configWebsocket = (wss: Server): void => {
    wss.on("connection", (ws) => {
        ws.on("message", (data) => {
            const message = JSON.parse(data.toString()) as IWSMessage;
            if (message.type === SUBSCRIBE) {
                websocketSessionStore = [
                    ...websocketSessionStore.filter(({id}) => id !== message.id),
                    {
                        session: ws,
                        bookId: message.bookId,
                        id: message.id
                    }
                ]
                ws.send(JSON.stringify({message: "Successful subscribe"}))
            }
        })
        ws.on("close", (data) => {
            console.log("close session on ws",data)
        })
        ws.send("Successful connection")
    });
}

export const commentDistribution = (bookId: number, comment: IUserComment) => websocketSessionStore
    .filter(({bookId: id}) => id === bookId)
    .forEach(({session}) => {
        if (session.readyState === session.OPEN) {
            const message:IWSCommentMessage = {message: "Duration send", comment};
            session.send(JSON.stringify(message))
        }
    })