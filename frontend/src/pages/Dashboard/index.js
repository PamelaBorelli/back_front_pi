import React from "react";
import Chart from "./charts_filtro";

function Dashboard (){
    
  return ( 
      <div > 
        <h5 style={{marginTop: 25, marginBottom: 15, fontFamily: "montserrat"}}>Usuário: </h5>
        <Chart />
      </div>
  )
};

export default Dashboard;
