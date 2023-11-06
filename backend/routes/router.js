const router = require("express").Router()

// dashboard router
const dashboardRouter = require("./dashboards")

router.use("/", dashboardRouter)

module.exports = router