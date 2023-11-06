// import React, { useState }from 'react';
// import ReactApexChart from "react-apexcharts"


// const Chart = () =>{

//   const [state] = useState({

//     series: [{
//         name: 'Income',
//         type: 'column',
//         data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
//       }, {
//         name: 'Cashflow',
//         type: 'column',
//         data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
//       }, {
//         name: 'Revenue',
//         type: 'line',
//         data: [20, 29, 37, 36, 44, 45, 50, 58]
//       }],
      
//       options: {
//         chart: {
//           height: 350,
//           type: 'line',
//           stacked: false
//         },
//         dataLabels: {
//           enabled: false
//         },
//         stroke: {
//           width: [1, 1, 4]
//         },
//         title: {
//           text: 'XYZ - Stock Analysis (2009 - 2016)',
//           align: 'left',
//           offsetX: 110
//         },
//         xaxis: {
//           categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
//         },
//         yaxis: [
//           {
//             axisTicks: {
//               show: true,
//             },
//             axisBorder: {
//               show: true,
//               color: '#008FFB'
//             },
//             labels: {
//               style: {
//                 colors: '#008FFB',
//               }
//             },
//             title: {
//               text: "Income (thousand crores)",
//               style: {
//                 color: '#008FFB',
//               }
//             },
//             tooltip: {
//               enabled: true
//             }
//           },
//           {
//             seriesName: 'Income',
//             opposite: true,
//             axisTicks: {
//               show: true,
//             },
//             axisBorder: {
//               show: true,
//               color: '#00E396'
//             },
//             labels: {
//               style: {
//                 colors: '#00E396',
//               }
//             },
//             title: {
//               text: "Operating Cashflow (thousand crores)",
//               style: {
//                 color: '#00E396',
//               }
//             },
//           },
//           {
//             seriesName: 'Revenue',
//             opposite: true,
//             axisTicks: {
//               show: true,
//             },
//             axisBorder: {
//               show: true,
//               color: '#FEB019'
//             },
//             labels: {
//               style: {
//                 colors: '#FEB019',
//               },
//             },
//             title: {
//               text: "Revenue (thousand crores)",
//               style: {
//                 color: '#FEB019',
//               }
//             }
//           },
//         ],
//         tooltip: {
//           fixed: {
//             enabled: true,
//             position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
//             offsetY: 30,
//             offsetX: 60
//           },
//         },
//         legend: {
//           horizontalAlign: 'left',
//           offsetX: 40
//         }
//       },


// })

// return (
//   <div className='APP'>
//       <ReactApexChart 
//           options={state.options} 
//           series={state.series} 
//           type="line" 
//           height={350}
//           width={800} /> 
//   </div>
// );
// };

// export default Chart;

import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart = () =>{

  const [state, setState] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    // Faz a requisição à API e armazena os dados no estado
    axios.get("http://localhost:3000/api/dashboards")
      .then(response => {
        const data = response.data;
        // Mapeia os dados para as séries do gráfico
        const series = [
          {
            name: 'Temp. do ar',
            type: 'column',
            data: data.map(d => d.air_temp),
            color: "#26438E"
          },
          {
            name: 'DNI',
            type: 'column',
            data: data.map(d => d.dni),
            color: '#2D81C2'
          },
          {
            name: 'GHI',
            type: 'line',
            data: data.map(d => d.ghi),
            color: '#FFC20F'
          }
        ];
        // Define as opções do gráfico
        const options = {
          chart: {
            height: 350,
            type: 'line',
            stacked: false
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: [1, 1, 4]
          },
          title: {
            text: 'Produção de energia e dados do clima',
            align: 'left',
            offsetX: 110
          },
          xaxis: {
            categories: data.map(d => new Date(d.period_end).toLocaleDateString()),
            labels: {
              format: 'dd/MM/yyyy'
            }
          },
          yaxis: [
            {
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#26438E'
              },
              labels: {
                style: {
                  colors: '#26438E',
                },
                formatter: (value) => `${value} °C`
              },
              title: {
                text: "Temperatura do ar (°C)",
                style: {
                  color: '#26438E',
                }
              },
              tooltip: {
                enabled: true
              }
            },
            {
              seriesName: 'DNI',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#2D81C2'
              },
              labels: {
                style: {
                  colors: '#2D81C2',
                },
                formatter: (value) => `${value} W/m²`
              },
              title: {
                text: "DNI (W/m²)",
                style: {
                  color: '#2D81C2',
                }
              },
            },
            {
              seriesName: 'GHI',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#FFC20F'
              },
              labels: {
                style: {
                  colors: '#FFC20F',
                },
                formatter: (value) => `${value} kWh/m²`
              },
              title: {
                text: "GHI (kWh/m²)",
                style: {
                  color: '#FFC20F',
                }
              }
            },
          ],
          tooltip: {
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
            },
          },
          legend: {
            horizontalAlign: 'left',
            offsetX: 40
          }
        };
        // Atualiza o estado com as séries e opções
        setState({ series, options });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='APP'>
        <ReactApexChart 
            options={state.options} 
            series={state.series} 
            type="line" 
            height={350}
            width={800} /> 
    </div>
  );
};

export default Chart;
