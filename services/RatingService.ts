import Sequelize from "sequelize"
import {Book, Rating} from "../models";
import {IBookFromDb} from "../interfaces/IBook";
import {BookModel} from "../models/Book.model";


const RatingService = {
    setRating: async (userId: number, bookId: number, rating: number): Promise<boolean> => {
        const book = await Book.findOne({
            where: {id: bookId},
            include: [{
                model: Rating,
                attributes: [[Sequelize.fn("COUNT", "bookId"), "ratingCount"]],
            }],
            group: ["book.id", "ratings.userId", "ratings.bookId"]
        }) as IBookFromDb & BookModel & { ratings?: { dataValues: { ratingCount: string | number } }[] } | null;
        let newRating = rating
        if (book && book.ratings && book.ratings.length) {
            const count = Number(book.ratings[0].dataValues.ratingCount) || 0;
            const number = book.rating * count;
            newRating = (number + rating) / count + 1;
        }
        if (book) {
            await Rating.create({userId, bookId, rating})
            book.rating = newRating
            book.save({fields: ["rating"]})
            return true
        }
        return false
    }
}

export default RatingService