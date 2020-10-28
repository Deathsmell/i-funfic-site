import {Sequelize} from 'sequelize';

const uri: string = process.env.DATABASE_URL || "postgres://localhost:5432/ifunfic";

export default new Sequelize(uri, {
    dialect: "postgres",
});


