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

export const Cart = sequelize.define("cart", {
  idMenu: DataTypes.STRING,
  name:DataTypes.STRING,
  imageUrl:DataTypes.STRING,
  quantity:DataTypes.INTEGER,
  price:DataTypes.INTEGER
}, {
  freezeTableName: true
});