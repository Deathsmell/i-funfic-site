export interface IChapter {
    id?: number,
    bookId: number,
    number?: number,
    title: string,
    text: string,
    updatedAt?: string
    createdAt?: string
}

export interface IChapterFromDb extends Required<IChapter>{}