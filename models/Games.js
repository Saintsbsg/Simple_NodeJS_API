const Sequelize = require("sequelize");
const connection = require("../database/database");

const Game = connection.define("game", {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },

    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

Game.sync({force: false}).then(() =>{});
module.exports = Game;