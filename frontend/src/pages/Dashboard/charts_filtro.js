import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from 'react';
import { fetchData } from './filtro'; 
import { calculateAverage } from './estatistica/media'; 
import { calculateMedian } from './estatistica/mediana'; 
import { calculateStandardDeviation } from './estatistica/desvio_padrao'; 
import { calculateMode } from './estatistica/moda'; 
import { calculateSkewness } from './estatistica/assimetria'; 
import { calculateKurtosis } from './estatistica/curtose'; 
import "./style.css"

const Chart = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [state, setState] = useState({series: [],options: {}});
  const [media, setMedia] = useState(0);
  const [mediana, setMediana] = useState(0);
  const [desvioPadrao, setPesvioPadrao] = useState(0);
  const [moda, setModa] = useState(0);
  const [assimetria, setSkewness] = useState(0);
  const [curtose, setKurtosiss] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData(startDate, endDate)
        .then(data => {
          const media = calculateAverage(data);
          setMedia(media);
          const mediana = calculateMedian(data);
          setMediana(mediana)
          const desvioPadrao = calculateStandardDeviation(data);
          setPesvioPadrao(desvioPadrao)
          const moda = calculateMode(data);
          setModa(moda)
          const assimetria = calculateSkewness(data);
          setSkewness(assimetria)
          const curtose = calculateKurtosis(data);
          setKurtosiss(curtose)

          const series = [
            {name: 'Temp. do ar', type: 'column', data: data.map(d => d.air_temp), color: "#26438E"},
            {name: 'DNI', type: 'column', data: data.map(d => d.dni), color: '#2D81C2'},
            {name: 'GHI', type: 'line', data: data.map(d => d.ghi), color: '#FFC20F'},
          ];

          const options = {
            chart: {
              height: 350, 
              type: 'line', 
              stacked: false
            },

            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5
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
                  show: true
                }, 

                axisBorder: {
                  show: true, 
                  color: '#26438E'
                }, 
                
                labels: {
                  style: {
                    colors: '#26438E'
                  }, 
            formatter: (value) => `${value} °C`}, 
                  
            title: {
              text: "Temperatura do ar (°C)", 
              style: {
                color: '#26438E'
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
              show: true
            }, 
            
            axisBorder: {
              show: true, 
              color: '#2D81C2'
            }, 
            
            labels: {
              style: {
                colors: '#2D81C2'
              }, 
          formatter: (value) => `${value} W/m²`
        }, 
        
        title: {
          text: "DNI (W/m²)", 
          style: {
            color: '#2D81C2'
          }
        }
      },
            {
              seriesName: 'GHI', 
              opposite: true, 
              axisTicks: {
                show: true
              }, 
              
              axisBorder: {
                show: true, 
                color: '#FFC20F'
              }, 
              
              labels: {
                style: {
                  colors: '#FFC20F'
                }, 
            formatter: (value) => `${value} kWh/m²`
          }, 
          
          title: {
            text: "GHI (kWh/m²)", 
            style: {
              color: '#FFC20F'
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
            }
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

      <div id="filtro">
      <h6 style={{marginLeft:30, marginTop:30}}>*Os dados são limitados à consulta de um período de sete dias</h6>
      <input type="date" value={startDate} onChange={handleStartDateChange} style={{marginLeft:30, marginBottom:30, marginTop:10}}/>
      <input type="date" value={endDate} onChange={handleEndDateChange}/>
      </div>

      <div class="row">
  <div class="card">
    <h3>Média</h3>
    <p>{media}</p>
  </div>

    <div class="card">
      <h3>Médiana</h3>
      <p>{mediana}</p>
    </div>
  </div>

  <div class="row">
    <div class="card">
      <h3>Desvio Padrão</h3>
      <p>{desvioPadrao}</p>
    </div>

    <div class="card">
      <h3>Moda</h3>
      <p>{moda}</p>
    </div>
  </div>

  <div class="row">
  <div class="card">
    <h3>Assimetria</h3>
    <p>{assimetria}</p>
  </div>

    <div class="card">
      <h3>Curtose</h3>
      <p>{curtose}</p>
    </div>
  </div>


      <div id="charts">
      <ReactApexChart options={state.options} series={state.series} type="line" height={450} width={1200}/>
      </div>

    </div>
  );
};

export default Chart;

// import ReactApexChart from "react-apexcharts";
// import { useState, useEffect } from 'react';
// import { fetchData } from './filtro'; 
// import { calculateAverage } from './estatistica/media'; 
// import { calculateMedian } from './estatistica/mediana'; 
// import { calculateStandardDeviation } from './estatistica/desvio_padrao'; 
// import { calculateMode } from './estatistica/moda'; 
// import { calculateSkewness } from './estatistica/assimetria'; 
// import { calculateKurtosis } from './estatistica/curtose'; 
// import "./style.css"

// const Chart = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [state, setState] = useState({series: [],options: {}, serie});
//   const [media, setMedia] = useState(0);
//   const [mediana, setMediana] = useState(0);
//   const [desvioPadrao, setPesvioPadrao] = useState(0);
//   const [moda, setModa] = useState(0);
//   const [assimetria, setSkewness] = useState(0);
//   const [curtose, setKurtosiss] = useState(0);

//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchData(startDate, endDate)
//         .then(data => {
//           const media = calculateAverage(data);
//           setMedia(media);
//           const mediana = calculateMedian(data);
//           setMediana(mediana)
//           const desvioPadrao = calculateStandardDeviation(data);
//           setPesvioPadrao(desvioPadrao)
//           const moda = calculateMode(data);
//           setModa(moda)
//           const assimetria = calculateSkewness(data);
//           setSkewness(assimetria)
//           const curtose = calculateKurtosis(data);
//           setKurtosiss(curtose)

//           const series = [
//             {name: 'Temp. do ar', type: 'column', data: data.map(d => d.air_temp), color: "#26438E"},
//             {name: 'DNI', type: 'column', data: data.map(d => d.dni), color: '#2D81C2'},
//             {name: 'GHI', type: 'line', data: data.map(d => d.ghi), color: '#FFC20F'},
//           ];

//           const options = {
//             chart: {
//               height: 350, 
//               type: 'line', 
//               stacked: false
//             },

//             dropShadow: {
//               enabled: true,
//               top: 0,
//               left: 0,
//               blur: 3,
//               opacity: 0.5
//             },

//             dataLabels: {
//               enabled: false
//             },

//             stroke: {
//               width: [1, 1, 4]
//             },

//             title: {
//               text: 'Produção de energia e dados do clima', 
//               align: 'left', 
//               offsetX: 110
//             },

//             xaxis: {
//               categories: data.map(d => new Date(d.period_end).toLocaleDateString()), 
//               labels: {
//                 format: 'dd/MM/yyyy'
//               }
//             },

//             yaxis: [
//               {
//                 axisTicks: {
//                   show: true
//                 }, 

//                 axisBorder: {
//                   show: true, 
//                   color: '#26438E'
//                 }, 
                
//                 labels: {
//                   style: {
//                     colors: '#26438E'
//                   }, 
//             formatter: (value) => `${value} °C`}, 
                  
//             title: {
//               text: "Temperatura do ar (°C)", 
//               style: {
//                 color: '#26438E'
//               }
//             }, 
            
//             tooltip: {
//               enabled: false
//             }
//           },
          
//           {
//             seriesName: 'DNI', 
//             opposite: true, 
//             axisTicks: {
//               show: true
//             }, 
            
//             axisBorder: {
//               show: true, 
//               color: '#2D81C2'
//             }, 
            
//             labels: {
//               style: {
//                 colors: '#2D81C2'
//               }, 
//           formatter: (value) => `${value} W/m²`
//         }, 
        
//         title: {
//           text: "DNI (W/m²)", 
//           style: {
//             color: '#2D81C2'
//           }
//         }
//       },
//             {
//               seriesName: 'GHI', 
//               opposite: true, 
//               axisTicks: {
//                 show: true
//               }, 
              
//               axisBorder: {
//                 show: true, 
//                 color: '#FFC20F'
//               }, 
              
//               labels: {
//                 style: {
//                   colors: '#FFC20F'
//                 }, 
//             formatter: (value) => `${value} kWh/m²`
//           }, 
          
//           title: {
//             text: "GHI (kWh/m²)", 
//             style: {
//               color: '#FFC20F'
//             }
//           }
//         },
//       ],
//           tooltip: {
//             fixed: {
//               enabled: true, 
//               position: 'topLeft', 
//               offsetY: 30, 
//               offsetX: 60
//             }
//           },

//             legend: {
//               horizontalAlign: 'left', 
//               offsetX: 40
//             }
//           };

//           setState({ series, options });


//           const scatterSeries = [{
//             name: 'DNI vs GHI',
//             data: data.map(d => ({x: d.dni, y: d.ghi}))
//           }];
  
//           const scatterOptions = {
//             chart: {
//               type: 'scatter',
//               height: 350
//             },
//             xaxis: {
//               tickAmount: 10,
//               title: {
//                 text: 'DNI'
//               }
//             },
//             yaxis: {
//               tickAmount: 7,
//               title: {
//                 text: 'GHI'
//               }
//             }
//           };
  
//           setScatterData(scatterSeries, scatterOptions);
  

//         })


        

//         .catch(error => {
//           console.error(error);
//         });
//     }
//   }, [startDate, endDate]);

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };

//   return (
//     <div className='APP'>

//       <div id="filtro">
//       <h6 style={{marginLeft:30, marginTop:30}}>*Os dados são limitados à consulta de um período de sete dias</h6>
//       <input type="date" value={startDate} onChange={handleStartDateChange} style={{marginLeft:30, marginBottom:30, marginTop:10}}/>
//       <input type="date" value={endDate} onChange={handleEndDateChange}/>
//       </div>

//       <div class="row">
//   <div class="card">
//     <h3>Média</h3>
//     <p>{media}</p>
//   </div>

//     <div class="card">
//       <h3>Médiana</h3>
//       <p>{mediana}</p>
//     </div>
//   </div>

//   <div class="row">
//     <div class="card">
//       <h3>Desvio Padrão</h3>
//       <p>{desvioPadrao}</p>
//     </div>

//     <div class="card">
//       <h3>Moda</h3>
//       <p>{moda}</p>
//     </div>
//   </div>

//   <div class="row">
//   <div class="card">
//     <h3>Assimetria</h3>
//     <p>{assimetria}</p>
//   </div>

//     <div class="card">
//       <h3>Curtose</h3>
//       <p>{curtose}</p>
//     </div>
//   </div>


//       <div id="charts">
//       <ReactApexChart options={state.options} series={state.series} type="line" height={450} width={1200}/>
//       <ReactApexChart options={scatterOptions} series={scatterData} type="scatter" height={350} />
//       </div>

//     </div>
//   );
// };

// export default Chart;