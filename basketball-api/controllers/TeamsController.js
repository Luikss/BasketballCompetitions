const { db } = require("../db")
const Team = db.teams

exports.getAll = async (req, res) => {
    const teams = await Team.findAll({attributes:["name"]})
    res.send(teams)
}

exports.getById = async (req, res) => {
    const teams = await Team.findByPk(req.params.id)
    if(teams === null) {
        res.status(404).send({"error": "Team not found"})
        return
    }
    res.send(teams)
}
exports.createNew = async (req, res) => {
    const teams = await Team.createNew(req.body)
    res.send(teams)
}