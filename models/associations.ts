import {Model, ModelCtor} from "sequelize";
import {IBook, IBookChapter, IBookTag, IComment, IUser} from "../interfaces";

const CASCADE = "cascade";

export const user_books_association = (
    User: ModelCtor<Model<IUser, IUser>>,
    Book: ModelCtor<Model<IBook, IBook>>
) => {
    console.log("USER_BOOKS")
    const user_book_fk = "authorId";
    User.hasMany(Book, {
        foreignKey: user_book_fk,
        onDelete: CASCADE,
        onUpdate: CASCADE,
    })

    Book.belongsTo(User, {
        foreignKey: user_book_fk,
    })
}

export const book_chapters_association = (
    Book: ModelCtor<Model<IBook, IBook>>,
    Chapter: ModelCtor<Model<IBookChapter, IBookChapter>>
) => {
    console.log("BOOK_CHAPTERS")
    const book_chapter_fk = "bookId"
    Book.hasMany(Chapter, {
        foreignKey: book_chapter_fk,
        onDelete: CASCADE,
        onUpdate: CASCADE,
    })

    Chapter.belongsTo(Book, {
        foreignKey: book_chapter_fk,
    })
}

export const books_tags_association = (
    Book: ModelCtor<Model<IBook, IBook>>,
    Tag: ModelCtor<Model<IBookTag, IBookTag>>
) => {
    console.log("BOOKS_TAGS")
    const through_table_name = "books_tags"
    Book.belongsToMany(Tag, {through: through_table_name})
    Tag.belongsToMany(Book, {through: through_table_name})
}

export const book_comments_association = (
    Book: ModelCtor<Model<IBook, IBook>>,
    Comment: ModelCtor<Model<IComment, IComment>>
) => {
    console.log("BOOKS_COMMENTS")
    const book_comments_fk = "bookId"
    Book.hasMany(Comment,{
        foreignKey: book_comments_fk,
        onUpdate: CASCADE,
        onDelete: CASCADE,
    })
    Comment.belongsTo(Book,{
        foreignKey: book_comments_fk,
    })
}