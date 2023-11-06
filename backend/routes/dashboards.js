const router = require("express").Router()

const dashboardController = require("../controllers/dashboardController")

// router
//     .route("/dashboards")
//     .post((req,res) => dashboardController.create(req, res))

router
    .route("/dashboards")
    .get((req,res) => dashboardController.getAll(req, res))

router
    .route("/dashboards/:id")
    .get((req,res) => dashboardController.get(req,res))

module.exports = router;
