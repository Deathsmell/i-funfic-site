import {UserStatic} from "./User.model";
import {BookStatic} from "./Book.model";
import {BookChapterStatic} from "./BookChapter.model";
import {TagStatic} from "./BookTag.model";
import {CommentStatic} from "./Comment.model";
declare var console: Console;

const CASCADE = "cascade";

export const user_books_association = (
    User: UserStatic,
    Book: BookStatic
): void => {
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
    Book: BookStatic,
    Chapter: BookChapterStatic,
): void => {
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
    Book: BookStatic,
    Tag: TagStatic,
): void => {
    console.log("BOOKS_TAGS")
    const through_table_name = "books_tags"
    Book.belongsToMany(Tag, {through: through_table_name})
    Tag.belongsToMany(Book, {through: through_table_name})
}

export const book_comments_association = (
    Book: BookStatic,
    Comment: CommentStatic
): void => {
    console.log("BOOKS_COMMENTS")
    const book_comments_fk = "bookId"
    Book.hasMany(Comment, {
        foreignKey: book_comments_fk,
        onUpdate: CASCADE,
        onDelete: CASCADE,
    })
    Comment.belongsTo(Book, {
        foreignKey: book_comments_fk,
    })
}

export const user_comments_association = (
    User: UserStatic,
    Comment: CommentStatic
): void => {
    console.log("USER_COMMENTS")
    const user_comments_fk = "userId"
    User.hasMany(Comment,{
        foreignKey: user_comments_fk,
        onDelete: CASCADE,
        onUpdate: CASCADE
    })
    Comment.belongsTo(User,{
        foreignKey: user_comments_fk,
    })
}