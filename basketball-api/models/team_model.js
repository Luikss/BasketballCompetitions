module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("team", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        homeCourt: {
            type: Sequelize.STRING,
            allowNull: false 
        }
    })
    return Team
}
