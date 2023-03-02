const { db } = require("../db")
const Game = db.games

exports.getAll = async (req, res) => {
  const games = await Game.findAll({
    include: { all: true }
  })

  let result = []
  result = games.map( (g) => {
    return {
        "id": g.dataValues.id,
        "name": g.dataValues.name
    }
  })
  res.send(result)
}

exports.getById = async (req, res) => {
  const game = await Game.findByPk(req.params.id, {
    include: { all: true }
  })

  if (game === null) {
      res.status(404).send({error: "Game not found"})
      return
  }

  let games = [game]
  let result = []
  result = games.map( (g) => {
    return {
        "id": g.dataValues.id,
        "name": g.dataValues.name,
        "location": g.dataValues.location,
        "teamOneName": g.dataValues.teamOne.dataValues.name,
        "teamTwoName": g.dataValues.teamTwo.dataValues.name,
        "teamOneScore": g.dataValues.teamOneScore,
        "teamTwoScore": g.dataValues.teamTwoScore
    }
  })
  res.send(result[0])
}

exports.createNew = async (req, res) => {
  let game
  try {
    game = await Game.create(req.body)
  } catch (error) {
    if (error instanceof db.Sequelize.ValidationError) {
      res.status(400).send({error: error.errors.map((item)=> item.message)})
    } else if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      res.status(400).send({"error":`Table:${error.table} does not contain row with id:${error.value}`})
    } else {
      res.status(500).send({error: "Something went wrong on our side. Sorry :("})
    }
    return
  }
  res
    .status(201)
    .location(`${getBaseUrl(req)}/games/${game.id}`)
    .json(game)
}

exports.deleteById = async (req, res) => {
  let result
  try {
    result = await Game.destroy({where: {id: req.params.id}})
  } catch (error) {
    res.status(500).send({error: "Something went wrong on our side. Sorry :("})
    return
  }
  if (result === 0) {
    res.status(404).send({error: "Game not found"})
    return
  }
  res.status(204).send()
}

exports.updateById = async (req,res) => {
  let result
  delete req.body.id
  try {
    result = await Game.update(req.body,{where: {id: req.params.id } })
  } catch (error) {
    res.status(500).send({error: "Something went wrong on our side. Sorry :(" })
    return
  }
  if (result[0] === 0) {
    res.status(404).send({error: "Game not found" })
    return
  }
  const game = await Game.findByPk(req.params.id)
  res
    .status(200)
    .location(`${getBaseUrl(req)}/games/${game.id}`)
    .json(game)  
}
  
getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encrypted ? "https" : "http") +
    `://${request.headers.host}`
  )
}
