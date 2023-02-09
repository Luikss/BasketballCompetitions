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

exports.createNew = async (req, res) => {
    let player
    try {
      player = await Player.create(req.body)
    } catch (error) {
      if (error instanceof db.Sequelize.ValidationError) {
        res.status(400).send({"error":error.errors.map((item)=> item.message)})
      } else {
        res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
      }
      return
    }
    res
      .status(201)
      .location(`${getBaseUrl(req)}/players/${player.id}`)
      .json(player)
}
