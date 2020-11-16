import {UserStatic} from "./User.model";
import {BookStatic} from "./Book.model";
import {ChapterStatic} from "./Chapter.model";
import {CommentStatic} from "./Comment.model";
import {LikeStatic} from "./Like.model";
import {RatingStatic} from "./Rating.model";

const CASCADE = "cascade";

export const user_books_association = (
    User: UserStatic,
    Book: BookStatic
): void => {
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
    Chapter: ChapterStatic,
): void => {
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


export const book_comments_association = (
    Book: BookStatic,
    Comment: CommentStatic
): void => {
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

export const chapter_likes_association = (
    Chapter: ChapterStatic,
    Like: LikeStatic
): void => {
    const chapter_likes_fk = "chapterId"
    Chapter.hasMany(Like, {
        foreignKey: chapter_likes_fk,
        onDelete: CASCADE,
        onUpdate: CASCADE
    })
    Like.belongsTo(Chapter, {
        foreignKey: chapter_likes_fk
    })
}

export const user_likes_association = (
    User: UserStatic,
    Like: LikeStatic
): void => {
    const user_likes_fk = "userId"
    User.hasMany(Like, {
        foreignKey: user_likes_fk,
        onDelete: CASCADE,
        onUpdate: CASCADE
    })
    Like.belongsTo(User, {
        foreignKey: user_likes_fk,
    })
}

export const book_ratings_association = (
    Book: BookStatic,
    Rating: RatingStatic
): void => {
    const book_ratings_fk = "bookId"
    Book.hasMany(Rating, {
        foreignKey: book_ratings_fk,
        onDelete: CASCADE,
        onUpdate: CASCADE
    })
    Rating.belongsTo(Book, {
        foreignKey: book_ratings_fk
    })
}

export const user_ratings_association = (
    User: UserStatic,
    Rating: RatingStatic
): void => {
    const user_ratings_fk = "userId"
    User.hasMany(Rating, {
        foreignKey: user_ratings_fk,
        onDelete: CASCADE,
        onUpdate: CASCADE
    })
    Rating.belongsTo(User, {
        foreignKey: user_ratings_fk,
    })
}