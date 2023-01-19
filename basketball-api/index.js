const app = require("express")()
const port = 8080

const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
