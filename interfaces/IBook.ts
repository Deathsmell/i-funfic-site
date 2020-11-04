export interface IBook {
    id?: number,
    title?: string,
    authorId: number,
    authorName: string,
    rating?: number,
    annotation?: string,
    genres?: BookGenres[],
    image?: string
}

export interface IBookChapter {
    id?: number,
    number: number,
    title: string,
    text: string,
}

export interface IBookTag {
    id?: number,
    tag: string,
}

export enum BookGenres {
    ACTION = "ACTION",
    FANTASTIC = "FANTASTIC",
}