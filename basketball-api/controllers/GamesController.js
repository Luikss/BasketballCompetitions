const { db } = require("../db")
const Game = db.games

exports.getAll = async (req, res) => {
    const games = await Game.findAll({attributes:["name"]})
    res.send(games)
}

exports.getById = async (req, res) => {
    const games = await Game.findByPk(req.params.id)
    if(games === null) {
        res.status(404).send({"error": "Game not found"})
        return
    }
    res.send(games)
}
