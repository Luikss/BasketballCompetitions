const gamesController = require("../controllers/GamesController.js")
const teamsController = require("../controllers/TeamsController")
const playersController = require("../controllers/PlayersController")

module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll)
        .post(gamesController.createNew)
    app.route("/games/:id")
        .get(gamesController.getById)
        .delete(gamesController.deleteById)
        .put(gamesController.updateById)

    app.route("/teams")
        .get(teamsController.getAll)
        .post(teamsController.createNew)
    app.route("/teams/:id")
        .get(teamsController.getById)
        .delete(teamsController.deleteById)
            
    app.route("/players")
        .get(playersController.getAll)
        .post(playersController.createNew)
    app.route("/players/:id")
        .get(playersController.getById)
        .delete(playersController.deleteById)
        .put(playersController.updateById)
}
