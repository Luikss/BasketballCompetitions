require("dotenv").config()

const app = require("express")()
const port = process.env.APP_PORT

const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
