const express = require("express")
const router = express.Router()
const db = require("../db")

/* GET All Todos */
router.get("/", async function (req, res) {
  try {
    const todos = await db.todoModel.findAll({
      order: [["created_at", "DESC"]],
    })
    console.log(todos)
    return res.status(200).json(todos)
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", message: error.message })
  }
})

/* GET All Completed Todos */
router.get("/complete", async function (req, res) {
  try {
    const todos = await db.todoModel.findAll({
      where: { is_completed: true },
      order: [["created_at", "DESC"]],
    })
    console.log(todos)
    return res.status(200).json(todos)
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", message: error.message })
  }
})

/* GET All New Todos */
router.get("/new", async function (req, res) {
  try {
    const todos = await db.todoModel.findAll({
      where: { is_completed: false },
      order: [["created_at", "DESC"]],
    })
    console.log(todos)
    return res.status(200).json(todos)
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", message: error.message })
  }
})

/* GET Todo by ID */
router.get("/:id", async function (req, res) {
  try {
    const todo = await db.todoModel.findByPk(req.params.id)
    if (!todo) {
      return res
        .status(404)
        .json({ status: "FAILURE", message: "Todo not found" })
    }
    console.log(todo)
    return res.status(200).json(todo)
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", message: error.message })
  }
})

/* POST New Todo */
router.post("/", async function (req, res) {
  try {
    const model = await db.todoModel.build({
      title: req.body.title,
      description: req.body.description,
      created_at: new Date(),
      timestamp: Date.now(),
    })
    const todo = await model.save()
    console.log(todo)
    return res.status(201).json(todo)
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", message: error.message })
  }
})

/* PUT Complete Todo */
router.put("/:id", async function (req, res) {
  try {
    const result = await db.todoModel.update(
      {
        is_completed: true,
      },
      { where: { id: req.params.id } },
    )
    console.log(result)
    if (!result) {
      return res
        .status(404)
        .json({ status: "FAILURE", message: "Todo not found" })
    }
    return res.status(200).json()
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", message: error.message })
  }
})

/* Update Todo by ID */
router.patch("/:id", async function (req, res) {
  try {
    const todo = await db.todoModel.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      { where: { id: req.params.id } },
    )
    if (!todo) {
      return res
        .status(404)
        .json({ status: "FAILURE", message: "Todo not found" })
    }
    console.log(todo)
    return res.status(200).json(todo)
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", message: error.message })
  }
})

/* Delete Todo by ID */
router.delete("/:id", async function (req, res) {
  try {
    const result = await db.todoModel.destroy({ where: { id: req.params.id } })
    if (!result) {
      return res
        .status(404)
        .json({ status: "FAILURE", message: "Todo not found" })
    }
    console.log(result)
    return res.status(204).json()
  } catch (error) {
    return res.status(400).json({ status: "FAILURE", message: error.message })
  }
})

module.exports = router
