const express = require("express")
const indexRouter = require("./routes/index")
const todoRouter = require("./routes/todo")
const db = require("./db")

const app = express()

app.use(express.json())

app.use("/", indexRouter)
app.use("/todos", todoRouter)

db.connect().then(() => {
  app.listen(8000, () => {
    console.log("Server listening at PORT 8080")
  })
})

module.exports = app
