module.exports = (sequelize, Sequelize, Team) => {
    const Player = sequelize.define("player", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false 
        },
        teamId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: Team,
                key: "id"
            }
        }
    })

    Team.hasMany(Player)
    Player.belongsTo(Team)

    return Player
}
