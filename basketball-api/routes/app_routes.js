const gamesController = require("../controllers/GamesController.js")
const teamsController = require("../controllers/TeamsController")
const playersController = require("../controllers/PlayersController")

module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll)
        //.post(gamesController.createNew)
    // app.route("/games/:id")
    //     .get(gamesController.getById)
    //     .put(gamesController.updateById)
    //     .delete(gamesController.deleteById)
    app.route("/teams")
        .get(teamsController.getAll)
    app.route("/players")
        .get(playersController.getAll)
}
