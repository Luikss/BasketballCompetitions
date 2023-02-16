const { db } = require("../db")
const Player = db.players

exports.getAll = async (req, res) => {
  const players = await Player.findAll({attributes:["id","firstName","lastName"]})
  res.send(players)
}

exports.getById = async (req, res) => {
  const player = await Player.findByPk(req.params.id, {
    include: { all: true }
  })
  
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

exports.updateById = async (req,res) => {
  let result
  delete req.body.id
  try {
    result = await Player.update(req.body,{where: {id: req.params.id } })
  } catch (error) {
    res.status(500).send({error: "Something went wrong on our side. Sorry :(" })
    return
  }
  if (result[0] === 0) {
    res.status(404).send({error: "Player not found" })
    return
  }
  const player = await Player.findByPk(req.params.id)
  res
    .status(200)
    .location(`${getBaseUrl(req)}/players/${player.id}`)
    .json(player)  
}

getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encrypted ? "https" : "http") +
    `://${request.headers.host}`
  )
}
