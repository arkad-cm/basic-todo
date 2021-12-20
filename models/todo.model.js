module.exports = (sql, Sequelize) => {
  return sql.define("todos", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    is_completed: {
      type: Sequelize.BOOLEAN,
    },
    created_at: {
      type: Sequelize.DATE
    },
    timestamp: {
      type: Sequelize.NUMBER
    },
  }, {timestamps: false})
}
