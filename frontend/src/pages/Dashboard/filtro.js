// import React, { useState, useEffect } from 'react';
// import ReactApexChart from "react-apexcharts";
// import axios from "axios";

// const Chart = () => {
//   const [state, setState] = useState({
//     series: [],
//     options: {}
//   });

//   const [filter, setFilter] = useState({ year: null, month: null });

//   const updateYear = (year) => setFilter((prev) => ({ ...prev, year: parseInt(year) }));
//   const updateMonth = (month) => setFilter((prev) => ({ ...prev, month: parseInt(month) }));

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/dashboards")
//       .then(response => {
//         const data = response.data;

//         const filteredData = data.filter((d) => {
//           const date = new Date(d.period_end);
//           if (filter.year && date.getFullYear() !== filter.year) return false;
//           if (filter.month && date.getMonth() + 1 !== filter.month) return false;
//           return true;
//         });

//         const series = [
//           {
//             name: 'Temp. do ar',
//             type: 'column',
//             data: filteredData.map(d => d.air_temp),
//             color: "#26438E"
//           },
//           {
//             name: 'DNI',
//             type: 'column',
//             data: filteredData.map(d => d.dni),
//             color: '#2D81C2'
//           },
//           {
//             name: 'GHI',
//             type: 'line',
//             data: filteredData.map(d => d.ghi),
//             color: '#FFC20F'
//           }
//         ];

//         const options = {
//           chart: {
//             height: 350,
//             type: 'line',
//             stacked: false
//           },
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             width: [1, 1, 4]
//           },
//           title: {
//             text: 'Produção de energia e dados do clima',
//             align: 'left',
//             offsetX: 110
//           },
//           xaxis: {
//             categories: filteredData.map(d => new Date(d.period_end).toLocaleDateString()),
//             labels: {
//               format: 'dd/MM/yyyy'
//             }
//           },
//           yaxis: [
//             {
//               axisTicks: {
//                 show: true,
//               },
//               axisBorder: {
//                 show: true,
//                 color: '#26438E'
//               },
//               labels: {
//                 style: {
//                   colors: '#26438E',
//                 },
//                 formatter: (value) => `${value} °C`
//               },
//               title: {
//                 text: "Temperatura do ar (°C)",
//                 style: {
//                   color: '#26438E',
//                 }
//               },
//               tooltip: {
//                 enabled: true
//               }
//             },
//             {
//               seriesName: 'DNI',
//               opposite: true,
//               axisTicks: {
//                 show: true,
//               },
//               axisBorder: {
//                 show: true,
//                 color: '#2D81C2'
//               },
//               labels: {
//                 style: {
//                   colors: '#2D81C2',
//                 },
//                 formatter: (value) => `${value} W/m²`
//               },
//               title: {
//                 text: "DNI (W/m²)",
//                 style: {
//                   color: '#2D81C2',
//                 }
//               },
//             },
//             {
//               seriesName: 'GHI',
//               opposite: true,
//               axisTicks: {
//                 show: true,
//               },
//               axisBorder: {
//                 show: true,
//                 color: '#FFC20F'
//               },
//               labels: {
//                 style: {
//                   colors: '#FFC20F',
//                 },
//                 formatter: (value) => `${value} kWh/m²`
//               },
//               title: {
//                 text: "GHI (kWh/m²)",
//                 style: {
//                   color: '#FFC20F',
//                 }
//               }
//             },
//           ],
//           tooltip: {
//             fixed: {
//               enabled: true,
//               position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
//               offsetY: 30,
//               offsetX: 60
//             },
//           },
//           legend: {
//             horizontalAlign: 'left',
//             offsetX: 40
//           }
//         };

//         setState({ series, options });
//       });
//   }, [filter]);

//   return (
//     <div>
//       <input type="number" onChange={(e) => updateYear(e.target.value)} placeholder="Ano" />
//       <input type="number" onChange={(e) => updateMonth(e.target.value)} placeholder="Mês" />
//       <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
//     </div>
//   );
// };

// export default Chart;

import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import axios from "axios";
// import {useParams} from 'react-router-dom';

const Chart = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [state, setState] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    if (startDate && endDate) {
      axios.get(`http://localhost:3000/api/dashboards/${startDate}/${endDate}/?limit=168`)
        .then(response => {
          const data = response.data;

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
                  enabled: false
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
                position: 'topLeft', 
                offsetY: 30,
                offsetX: 60
              },
            },
            legend: {
              horizontalAlign: 'left',
              offsetX: 40
            }
          };
          setState({ series, options });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className='APP'>
      <h6 style={{marginLeft:30, marginTop:30}}>*Os dados são limitados a consulta de sete dias</h6>
      <input type="date" value={startDate} onChange={handleStartDateChange} style={{marginLeft:30, marginBottom:30, marginTop:10}}/>
      <input type="date" value={endDate} onChange={handleEndDateChange} />

      <ReactApexChart 
        options={state.options} 
        series={state.series} 
        type="line" 
        height={450} 
        width={1200} 
       
      />
    </div>
  );
};

export default Chart;

