require("dotenv").config()

const app = require("express")()
const mariadb = require("mariadb")
const port = process.env.APP_PORT
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
})

app.get("/customers", async (req, res) => {
    let connection 
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT * FROM customers")
        console.log(rows)
        res.send(rows)
    } catch (error) {
        throw error
    } finally {
        if (connection) {
            return connection.end()
        }
    }
})

app.get("/games", (req, res) => {
    res.send(["Paide Cup", "Veteranide Loivamine"])
})

app.get("/teams", (req, res) => {
    res.send(["Tõrva Sopsutajad", "Saaremaa Dunkers"])
})

app.get("/players", (req, res) => {
    res.send(["Andre Luige", "Dagne Markiine Kotkas"])
})

app.get("/players/:id", async (req, res) => {
    if (req.params.id == null) {
        res.status(400).send("ID is required!")
    }

    let connection 
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT * FROM players WHERE id = ?", [req.params.id])

        if (rows && rows.length > 0) {
            res.send(rows)
        } else {
            res.status(404).send("No player with given ID exists.")
        }
    } catch (error) {
        throw error
    } finally {
        if (connection) {
            return connection.end()
        }
    }
})

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
