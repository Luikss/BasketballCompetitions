module.exports = (sequelize, Sequelize, Team) => {
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
        teamOneId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: "id",
            }
        },
        teamTwoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: "id",
            }
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

    Team.belongsToMany(Game, { through: Game })
    Team.hasMany(Game)
    Game.belongsTo(Team)

    return Game
}
