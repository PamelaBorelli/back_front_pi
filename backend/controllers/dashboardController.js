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

//     get: async (req,res) => {

//         try {
//             const startDate = new Date(req.params.startDate).toISOString();
//             const endDate = new Date(req.params.endDate).toISOString();
        
//             const registros = await DashboardModel.find({
//               period_end: { $gte: startDate, $lte: endDate }
//             });

//             if (registros && registros.length > 0) {
//                 res.json(registros); 
//                 console.log(registros.length);
//               } else {
//                 res.status(404).json({ message: 'Nenhum registro encontrado para o intervalo de datas especificado' });
//               }
//             } catch (err) {
//               res.status(500).json({ message: err.message });
//             }
//     }

get: async (req,res) => {
    try {
        const startDate = new Date(req.params.startDate).toISOString();
        const endDate = new Date(req.params.endDate).toISOString();
        const limit = req.query.limit?parseInt(req.query.limit) : null;

        let registros = await DashboardModel.find({
          period_end: { $gte: startDate, $lte: endDate}
        });

        if (limit) {
          registros = registros.slice(0, limit);
        }

        if (registros && registros.length > 0) {
            res.json(registros); 
            // console.log(registros.length);
          } else {
            res.status(404).json({ message: 'Nenhum registro encontrado para o intervalo de datas especificado' });
          }
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
}

};

module.exports = dashboardController;
