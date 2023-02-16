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
                key: "id"
            }
        },
        teamTwoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: "id"
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

    Team.hasMany(Game, {
        foreignKey: 'teamOneId',
        as: 'teamOne'
    })
    Team.hasMany(Game, {
        foreignKey: 'teamTwoId',
        as: 'teamTwo'
    })
    Game.belongsTo(Team, {
        foreignKey: 'teamOneId',
        as: 'teamOne'
    })
    Game.belongsTo(Team, {
        foreignKey: 'teamTwoId',
        as: 'teamTwo'
    })

    return Game
}
