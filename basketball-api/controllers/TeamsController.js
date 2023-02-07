const { db } = require("../db")
const Team = db.teams

exports.getAll = async (req, res) => {
  const teams = await Team.findAll({attributes:["name"]})
  res.send(teams)
}

exports.getById = async (req, res) => {
  const teams = await Team.findByPk(req.params.id)
  if (teams === null) {
    res.status(404).send({"error": "Team not found"})
      return
  }
  res.send(teams)
}

exports.createNew = async (req, res) => {
  let team
  try {
    team = await Team.create(req.body)
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
    .location(`${getBaseUrl(req)}/teams/${team.id}`)
    .json(team)
}
getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encrypted ? "https" : "http") +
    `://${request.headers.host}`
  )
}
