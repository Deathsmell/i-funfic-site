export type TagItem<T = string> = { value: T };

export interface ITagItem extends TagItem {
    count?: number
}
