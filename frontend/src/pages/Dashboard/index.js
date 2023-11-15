import React from "react";
import Chart from "./charts_filtro";
import ScatterChart from './estatistica/regressao'


function Dashboard (){
    
  return ( 
      <div > 
        <Chart />
        <ScatterChart/>
      </div>
  )
};

export default Dashboard;
