module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        location: {
            type: Sequelize.STRING,
            allowNull: true 
        },
        teamOneName: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        teamTwoName: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        teamOneScore: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        teamTwoScore: {
            type: Sequelize.INTEGER,
            allowNull: true 
        }
    })
    return Game
}
