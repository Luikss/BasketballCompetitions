const app = require("express")()
const port = 8080

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
