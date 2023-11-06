const {Dashboard:DashboardModel} = require('../models/Dashboard')

const dashboardController = {
    create: async(req,res) =>{
        try {

            const dashboard = {

                air_temp: req.body.air_temp,
                dni: req.body.dni,
                ghi: req.body.ghi,
                period_end: req.body.period_end,
                period: req.body.period,

            }
            const response = await DashboardModel.create(dashboard);

            res.status(201).json({response, msg: "dados criado com sucesso"})

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async(req, res) => {

        try {
            const dashboards = await DashboardModel.find();
            res.json(dashboards); 

        } catch (error) {
            console.log(error);
    }
 },

    get: async(req,res)=>{
        try {

            const id = req.params.id
            const dashboard = await DashboardModel.findById(id);

            res.json(dashboard)

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = dashboardController;
