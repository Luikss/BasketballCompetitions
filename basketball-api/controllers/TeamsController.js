const db = require("../db")
const Team = db.teams

exports.getAll = async (req, res) => {
    const teams = await Team.findAll({attributes:["name"]})
    res.send(teams)
}
