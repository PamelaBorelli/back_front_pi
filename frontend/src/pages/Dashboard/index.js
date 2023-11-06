// import Chart from "./charts";
// import React from "react";
// import Chart from "./charts_copy";


// function Dashboard (){
    
//   return ( 

//       <div > 
//         {/* <h3 style={{marginTop: 25, fontFamily: "montserrat"}}></h3> */}
//         <h5 style={{marginTop: 25, marginBottom: 15, fontFamily: "montserrat"}}>Usuário: </h5>
//         <Chart />

//       </div>

//   )
// };

// export default Dashboard;

// Importar o React e o componente Card
import React from "react";
import Chart from "./charts";

// Criar o componente funcional para o Dashboard
function Dashboard (){
    
  return ( 

      <div > 
        {/* <h3 style={{marginTop: 25, fontFamily: "montserrat"}}></h3> */}
        <h5 style={{marginTop: 25, marginBottom: 15, fontFamily: "montserrat"}}>Usuário: </h5>
        <Chart />
      </div>

  )
};

// Exportar o componente
export default Dashboard;
