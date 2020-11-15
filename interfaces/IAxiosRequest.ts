export type BodyIdRequest = {
    id: number
}

export type ParamIdRequest = {
    id: string
}

export type BodyLikeRequest = {
    userId: number,
    chapterId: number
}


export type BodyLikeByBookIdRequest = {
    userId: number,
    bookId: number
}