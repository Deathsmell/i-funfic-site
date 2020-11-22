import {Op} from "sequelize"
import {IBook} from "../interfaces";
import {Book} from "../models";
import {IBookFromDb} from "../interfaces";


const BookService = {
    create: async (book: IBook): Promise<IBookFromDb> => {
        return await Book.create(book) as IBookFromDb
    },
    getById: async (id: number): Promise<IBookFromDb | null> => {
        return await Book.findOne({where: {id}}) as IBookFromDb | null;
    },
    getAll: async (): Promise<IBookFromDb[]> => {
        return await Book.findAll() as IBookFromDb[];
    },
    getByUserId: async (id: number): Promise<IBookFromDb[]> => {
        return await Book.findAll({where: {authorId: id}}) as IBookFromDb[]
    },
    getTagsCount: async (): Promise<{ value: string, count: number }[]> => {
        const tags = await Book.findAll({attributes: ["tags"]}) as IBookFromDb[] as any;
        let result = {} as any
        tags
            .flatMap(({tags}:{tags:any}) => tags)
            .forEach((value:string) => {
                result[value] = result[value] || result[value] === 0 ? result[value] + 1 : 0
            });
        return Object.entries<number>(result).map(([value, count]) => ({value, count}))
    },
    getAllOrderRating: async (): Promise<IBookFromDb[]> => {
        return await Book.findAll({order: [["rating", "DESC"]]}) as IBookFromDb[];
    },
    getAllByTags: async (tags: string[]): Promise<IBookFromDb[]> => {
        if (!tags || !tags.length) return BookService.getAll()
        return await Book.findAll({
            where: {
                tags: {
                    [Op.contains]: tags
                }
            }
        }) as IBookFromDb[];
    },
    getAllOrderRatingByTags: async (tags: string[]): Promise<IBookFromDb[]> => {
        if (!tags || !tags.length) return BookService.getAllOrderRating()
        console.log("Get by tags")
        return await Book.findAll({
            order: [["rating", "DESC"]],
            where: {
                tags: {
                    [Op.contains]: tags
                }
            }
        }) as IBookFromDb[];
    },
}

export default BookService