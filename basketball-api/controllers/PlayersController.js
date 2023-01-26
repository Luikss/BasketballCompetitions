const { db } = require("../db")
const Player = db.players

exports.getAll = async (req, res) => {
    const players = await Player.findAll({attributes:["firstName","lastName"]})
    res.send(players)
}

// app.get("/players/:id", async (req, res) => {
//     if (req.params.id == null) {
//         res.status(400).send("ID is required!")
//     }

//     let connection 
//     try {
//         connection = await pool.getConnection()
//         const rows = await connection.query("SELECT * FROM players WHERE id = ?", [req.params.id])

//         if (rows && rows.length > 0) {
//             res.send(rows)
//         } else {
//             res.status(404).send("No player with given ID exists.")
//         }
//     } catch (error) {
//         throw error
//     } finally {
//         if (connection) {
//             return connection.end()
//         }
//     }
// })
