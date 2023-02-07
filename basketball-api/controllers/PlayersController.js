const { db } = require("../db")
const Player = db.players

exports.getAll = async (req, res) => {
    const players = await Player.findAll({attributes:["firstName","lastName"]})
    res.send(players)
}

exports.getById = async (req, res) => {
    const player = await Player.findByPk(req.params.id)
    if(player === null) {
        res.status(404).send({"error": "Player not found"})
        return
    }
    res.send(player)
}
