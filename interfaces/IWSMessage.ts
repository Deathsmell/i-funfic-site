import {IUserComment} from "./IComment";

export interface IWSMessage {
    type: ITypeMessage,
    id: number
    bookId: number
}

export interface IWSCommentMessage {
    message: string,
    comment: IUserComment
}

export interface ISubscribeBookMessage extends IWSMessage{}

export interface IUnsubscribeBookMessage extends IWSMessage{}

export type ITypeMessage = typeof SUBSCRIBE | typeof UNSUBSCRIBE

export const SUBSCRIBE = "subscribe"
export const UNSUBSCRIBE = "unsubscribe"
