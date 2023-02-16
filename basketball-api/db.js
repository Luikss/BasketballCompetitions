const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        }
    }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.players = require("./models/player_model")(sequelize, Sequelize);
db.teams = require("./models/team_model")(sequelize, Sequelize);
db.games = require("./models/game_model")(sequelize, Sequelize, db.teams);

async function Sync() {
    await sequelize.sync({alter:true});
}

module.exports = { db, Sync }
