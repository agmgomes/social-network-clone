const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const { User, Post, Comment } = require('../models');

const connection = new Sequelize(dbConfig);

User.init(connection);
Post.init(connection);
Comment.init(connection);

User.associate(connection.models);
Post.associate(connection.models);
Comment.associate(connection.models);

module.exports = connection;
