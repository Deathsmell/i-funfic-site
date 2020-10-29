import {
    book_chapters_association,
    book_comments_association,
    books_tags_association,
    user_books_association, user_comments_association
} from "./associations";
import sequelize from "./database";
import {DataTypes} from "sequelize"
import {BookFactory, BookStatic} from "./Book.model";
import {UserFactory, UserStatic} from "./User.model";
import {BookChapterStatic, ChapterFactory} from "./BookChapter.model";
import {TagFactory, TagStatic} from "./BookTag.model";
import {CommentFactory, CommentStatic} from "./Comment.model";

const Book: BookStatic = BookFactory(sequelize, DataTypes);
const User: UserStatic = UserFactory(sequelize, DataTypes);
const Chapter: BookChapterStatic = ChapterFactory(sequelize, DataTypes);
const Tag: TagStatic = TagFactory(sequelize, DataTypes);
const Comment: CommentStatic = CommentFactory(sequelize, DataTypes);

user_books_association(User, Book);
book_chapters_association(Book, Chapter);
books_tags_association(Book, Tag);
book_comments_association(Book, Comment);
user_comments_association(User,Comment);

export {
    sequelize,
    User,
    Chapter,
    Tag,
    Comment,
    Book
}