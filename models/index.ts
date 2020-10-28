import {
    book_chapters_association,
    book_comments_association,
    books_tags_association,
    user_books_association
} from "./associations";
import sequelize from "./database";
import {DataTypes} from "sequelize"
import {bookInit} from "./Book.model";
import {userInit} from "./User.model";
import {chapterInit} from "./BookChapter.model";
import {tagInit} from "./BookTag.model";
import {commentInit} from "./Comment.model";

const Book = bookInit(sequelize, DataTypes);
const User = userInit(sequelize, DataTypes);
const Chapter = chapterInit(sequelize, DataTypes);
const Tag = tagInit(sequelize, DataTypes);
const Comment = commentInit(sequelize, DataTypes);

user_books_association(User, Book);
book_chapters_association(Book, Chapter);
books_tags_association(Book, Tag);
book_comments_association(Book, Comment)

export {
    sequelize,
    Book,
    User,
    Chapter,
    Tag,
    Comment
}