require("dotenv").config()

const app = require("express")()
const port = process.env.APP_PORT
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

require("./routes/app_routes")(app)

app.listen(port, async () => {
    await require("./db").Sync()
    console.log(`API up at: http://localhost:${port}`)
})
