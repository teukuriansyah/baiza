import { Sequelize, DataTypes } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

export const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: 'baiza',
  user: 'root',
  password: '',
  host: 'localhost',
  port: 3306,
});

export const Wishlist = sequelize.define("wishlist", {
  idMenu: DataTypes.STRING,
}, {
  freezeTableName: true
});

export default Wishlist;