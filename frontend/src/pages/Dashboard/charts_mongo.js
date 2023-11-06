import React, {  useEffect } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";


const Chart = () => {
  const sdk = new ChartsEmbedSDK({baseUrl: "https://charts.mongodb.com/charts-minha-api-rest-wevhj"});


  useEffect(() => {
    const chart1 = sdk.createDashboard({
      dashboardId: "65366172-c4df-4d98-8e94-3f3dce51c427",  height: 650, heightMode: "scale", widthMode: "scale", autoRefresh: true
    });

    chart1
    .render(document.getElementById('chart1'))
    .catch(() => window.alert('Dashboard failed to initialise'))

  });

  return <div className= "dash" id = "chart1"/>

}

export default Chart;

            