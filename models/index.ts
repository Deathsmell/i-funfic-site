import {
    book_chapters_association,
    book_comments_association,
    books_tags_association,
    user_books_association,
    user_comments_association
} from "./associations";
import sequelize from "./database";
import {DataTypes} from "sequelize"
import {BookFactory, BookStatic} from "./Book.model";
import {UserFactory, UserStatic} from "./User.model";
import {BookChapterStatic, ChapterFactory} from "./BookChapter.model";
import {TagFactory, TagStatic} from "./BookTag.model";
import {CommentFactory, CommentStatic} from "./Comment.model";
import {Roles} from "../interfaces";
import bcrypt from "bcrypt"

const Book: BookStatic = BookFactory(sequelize, DataTypes);
const User: UserStatic = UserFactory(sequelize, DataTypes);
const Chapter: BookChapterStatic = ChapterFactory(sequelize, DataTypes);
const Tag: TagStatic = TagFactory(sequelize, DataTypes);
const Comment: CommentStatic = CommentFactory(sequelize, DataTypes);

user_books_association(User, Book);
book_chapters_association(Book, Chapter);
books_tags_association(Book, Tag);
book_comments_association(Book, Comment);
user_comments_association(User, Comment);

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
    Tag,
    Comment,
    Book,
    dbAuthenticate
}