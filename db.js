const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(
  "postgres://postgres:root@127.0.0.1:5432/citymall",
  {
    logging: console.log,
  },
)

async function connect() {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

const db = {}
db.connect = connect
db.Sequelize = Sequelize
db.sequelize = sequelize
db.todoModel = require("./models/todo.model.js")(sequelize, Sequelize)
module.exports = db
