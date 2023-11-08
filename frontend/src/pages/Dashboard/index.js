import React from "react";
import Chart from "./filtro";
// import Mongo from "./charts_mongo"


function Dashboard (){
    
  return ( 

      <div > 
        {/* <h3 style={{marginTop: 25, fontFamily: "montserrat"}}></h3> */}
        <h5 style={{marginTop: 25, marginBottom: 15, fontFamily: "montserrat"}}>Usuário: </h5>
        <Chart />
        {/* <Mongo/> */}
      </div>

  )
};

// Exportar o componente
export default Dashboard;
