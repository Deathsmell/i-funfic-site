export interface IBook {
    id?: number,
    title: string,
    authorId: number,
    authorName: string,
    rating?: number,
    annotation: string,
    gainers: BookGenres[],
    tags: string[]
    image?: string,
    updatedAt?: string
    createdAt?: string
}

export interface IBookFromDb extends Required<IBook>{}

export enum BookGenres {
    ACTION = "ACTION",
    FANTASTIC = "FANTASTIC",
}