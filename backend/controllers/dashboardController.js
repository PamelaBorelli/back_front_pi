const {Dashboard:DashboardModel} = require('../models/Dashboard')

const dashboardController = {
    
    getAll: async(req, res) => {

        try {
            const dashboards = await DashboardModel.find();
            res.json(dashboards); 

        } catch (error) {
            console.log(error);
    }
 },

    // get: async(req,res)=>{
    //     try {

    //         const id = req.params.id
    //         const dashboard = await DashboardModel.findById(id);

    //         res.json(dashboard)

    //     } catch (error) {
    //         console.log(error);
    //     }
    // },

    
    get: async (req,res) => {

        try {
            const startRange = new Date(req.params.startDate);
            const endRange = new Date(req.params.endDate);
        
            const registros = await DashboardModel.find({
              period_end: { $gte: startRange, $lte: endRange }
            });

            if (registros && registros.length > 0) {
                res.json(registros); 
              } else {
                res.status(404).json({ message: 'Nenhum registro encontrado para o intervalo de datas especificado' });
              }
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
    },

    getSelection: async (req, res) => {
   
        try {
        const { startDate, endDate } = req.params;
          const data = await DashboardModel.find({
            period_end: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          });
      
          res.json(data);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }

  };


module.exports = dashboardController;
