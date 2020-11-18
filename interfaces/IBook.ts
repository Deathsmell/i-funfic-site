export interface IBook {
    id?: number,
    title: string,
    authorId: number,
    authorName: string,
    rating?: number,
    annotation: string,
    gainers: string[],
    tags: string[]
    image?: string,
    updatedAt?: string
    createdAt?: string
}

export interface IBookFromDb extends Required<IBook>{}
