import {
    book_chapters_association,
    book_comments_association, book_ratings_association, chapter_likes_association,
    user_books_association,
    user_comments_association, user_likes_association, user_ratings_association
} from "./associations";
import sequelize from "./database";
import {DataTypes} from "sequelize"
import {BookFactory, BookStatic} from "./Book.model";
import {UserFactory, UserStatic} from "./User.model";
import {ChapterStatic, ChapterFactory} from "./Chapter.model";
import {CommentFactory, CommentStatic} from "./Comment.model";
import {Roles} from "../interfaces";
import bcrypt from "bcrypt"
import {LikeFactory, LikeStatic} from "./Like.model";
import {RatingFactory, RatingStatic} from "./Rating.model";

const Book: BookStatic = BookFactory(sequelize, DataTypes);
const User: UserStatic = UserFactory(sequelize, DataTypes);
const Chapter: ChapterStatic = ChapterFactory(sequelize, DataTypes);
const Comment: CommentStatic = CommentFactory(sequelize, DataTypes);
const Like: LikeStatic = LikeFactory(sequelize,DataTypes);
const Rating: RatingStatic = RatingFactory(sequelize,DataTypes);

user_books_association(User, Book);
book_chapters_association(Book, Chapter);
book_comments_association(Book, Comment);
user_comments_association(User, Comment);
user_likes_association(User,Like)
chapter_likes_association(Chapter,Like);
book_ratings_association(Book,Rating);
user_ratings_association(User,Rating);

function dbAuthenticate(mode: boolean) {
    sequelize.authenticate().then(async () => {
        console.log("Connect DB")
        await sequelize.sync({force: true})
            .then(async () => {
                console.log("Sequelize synced ...")
                if (!mode) {
                    const bcryptPassword = await bcrypt.hash("123", 12);
                    const admin = await User.create({
                        username: "deathsmell",
                        email: "johndeathsmell@gmail.com",
                        password: bcryptPassword,
                        roles: [Roles.ADMIN, Roles.USER],
                        confirm: true,
                        image: "https://avatars.mds.yandex.net/get-pdb/1976636/ac1ce1a1-c9a4-4355-9a49-73627c1b9aab/s1200"
                    });
                    console.log("Create admin:",admin.username)
                }
            })
            .catch((error: Error) => {
                console.log("Error", error)
            })
    }).catch(console.error)
}

export {
    sequelize,
    User,
    Chapter,
    Comment,
    Book,
    Like,
    Rating,
    dbAuthenticate
}