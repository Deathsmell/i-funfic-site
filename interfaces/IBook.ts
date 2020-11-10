export interface IBook {
    id?: number,
    title: string,
    authorId: number,
    authorName: string,
    rating?: number,
    annotation: string,
    genres: BookGenres[],
    image?: string,
    updatedAt?: string
    createdAt?: string
}

export interface IBookFromDb extends Required<IBook>{}


export enum BookGenres {
    ACTION = "ACTION",
    FANTASTIC = "FANTASTIC",
}