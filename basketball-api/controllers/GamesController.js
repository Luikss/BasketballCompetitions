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

exports.createNew = async (req, res) => {
    let game
    try {
      game = await Game.create(req.body)
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
      .location(`${getBaseUrl(req)}/games/${game.id}`)
      .json(game)
  }
  getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )
  }
