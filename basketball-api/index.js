require("dotenv").config()

const app = require("express")()
const port = process.env.APP_PORT
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

app.get("/games", (req, res) => {
    res.send(["Paide Cup", "Veteranide Loivamine"])
})

app.get("/teams", (req, res) => {
    res.send(["Tõrva Sopsutajad", "Saaremaa Dunkers"])
})

app.get("/players", (req, res) => {
    res.send(["Andre Luige", "Dagne Markiine Kotkas"])
})

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
