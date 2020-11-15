export interface ILike {
    chapterId: number,
    userId: number
}

export interface ILikeFromDb extends Required<ILike>{}