const router = require("express").Router()

const dashboardController = require("../controllers/dashboardController")

router
    .route("/dashboards")
    .get((req,res) => dashboardController.getAll(req, res))

// router
//     .route("/dashboards/:startDate/:endDate")
//     .get((req,res) => dashboardController.get(req,res))


router
    .route("/api/dashboards/:startDate/:endDate")
    .get((req,res) => dashboardController.getSelection(req,res));


module.exports = router;
