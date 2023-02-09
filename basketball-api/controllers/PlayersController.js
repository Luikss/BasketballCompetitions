const { db } = require("../db")
const Player = db.players

exports.getAll = async (req, res) => {
  const players = await Player.findAll({attributes:["firstName","lastName"]})
  res.send(players)
}

exports.getById = async (req, res) => {
  const player = await Player.findByPk(req.params.id)
  if(player === null) {
    res.status(404).send({error: "Player not found"})
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
      res.status(400).send({error:error.errors.map((item)=> item.message)})
    } else {
      res.status(500).send({error:"Something went wrong on our side. Sorry :("})
    }
    return
  }
  res
    .status(201)
    .location(`${getBaseUrl(req)}/players/${player.id}`)
    .json(player)
}

exports.deleteById = async (req, res) => {
  let result
  try {
    result = await Player.destroy({where: {id: req.params.id}})
  } catch (error) {
    res.status(500).send({error:"Something went wrong on our side. Sorry :("})
    return
  }
  if (result === 0) {
    res.status(404).send({error:"Player not found"})
    return
  }
  res.status(204).send()
}

getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encrypted ? "https" : "http") +
    `://${request.headers.host}`
  )
}
