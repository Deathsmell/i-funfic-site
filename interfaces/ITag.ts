export interface ITag {
    id?: number,
    tag: string,
}

export interface ITagFromDB extends Required<ITag>{}