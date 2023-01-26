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

app.get("/players", async (req, res) => {
    let connection 
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT firstName, lastName FROM players")
        res.send(rows)
    } catch (error) {
        throw error
    } finally {
        if (connection) {
            return connection.end()
        }
    }
})

app.get("/games", async (req, res) => {
    let connection 
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT name FROM games")
        res.send(rows)
    } catch (error) {
        throw error
    } finally {
        if (connection) {
            return connection.end()
        }
    }
})

app.get("/teams", (req, res) => {
    res.send(["Tõrva Sopsutajad", "Saaremaa Dunkers"])
})

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
