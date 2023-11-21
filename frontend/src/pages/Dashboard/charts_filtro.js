import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from 'react';
import { fetchData } from './filtro'; 
import { calculateAverage } from './estatistica/media'; 
import { calculateMedian } from './estatistica/mediana'; 
import { calculateStandardDeviation } from './estatistica/desvioPadrao'; 
import { calculateMode } from './estatistica/moda'; 
import { calculateSkewness } from './estatistica/assimetria'; 
import { calculateNormalDistribution } from './estatistica/distribuicaoNormal';
import { calculateFirstQuartile, calculateThirdQuartile } from './estatistica/quartil'
import { calculateLinearRegression } from './estatistica/regressao';
import Legend from './legenda'
import "./style.css"

const Chart = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [state, setState] = useState({series: [],options: {}, boxPlotSeries:[], boxPlotOptions:{},regressionSeries: [], regressionOptions: {}});
  const [media, setMedia] = useState(0);
  const [mediana, setMediana] = useState(0);
  const [desvioPadrao, setPesvioPadrao] = useState(0);
  const [moda, setModa] = useState(0);
  const [assimetria, setSkewness] = useState(0);
  const [distribution, setDistribution] = useState(0);
  const [x, setX] = useState(0); 
  const [q1, setFirstQuartil] = useState(0);
  const [q3, setThirdQuartil] = useState(0)


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
          const distribution = calculateNormalDistribution(data, x);
          setDistribution(distribution);
          const q1 = calculateFirstQuartile(data);
          setFirstQuartil(q1);
          const q3 = calculateThirdQuartile(data);
          setThirdQuartil(q3)
          const max = Math.max(...data.map(d => d.ghi));
          const min = Math.min(...data.map(d => d.ghi));
          const regression = calculateLinearRegression(data);
          const regressionLine = data.map(d => regression.m * d.dni + regression.b);
          
          // gráfico de barras e linha
          const series = [
            {name: 'Temp. do ar', type: 'column', data: data.map(d => d.air_temp), color: '#2D81C2'},
            {name: 'DNI', type: 'column', data: data.map(d => d.dni), color: "#26438E"},
            {name: 'GHI', type: 'line', data: data.map(d => d.ghi), color: '#FFC20F'},
          ];

          const options = {
            chart: {
              height: 350, 
              type: 'line', 
              stacked: false
            },

            stroke: {
              width: [1, 1, 3]
            },

            title: {
              text: 'Produção de energia e dados do clima', 
              align: 'left', 
              offsetX: 110,
            },

            xaxis: {
              categories: data.map(d => new Date(d.period_end).toLocaleDateString()), 
              labels: {
                format: 'dd/MM/yyyy'
              }
            },

            yaxis: [
              {
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
          },
          
          {
            seriesName: 'DNI', 
            opposite: true, 
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
            },
            plotOptions: {
              bar: {
                  columnWidth: '100%',
              }
          }
          };      
          
          // gráfico de distribuição normal
          const boxPlotSeries = [{
            name: 'GHI',
            type: 'boxPlot',
            data: [{
              x: 'GHI',
              y: [min, q1, media, q3, max]
            }]
          },
          {
            name: 'valor normal',
            type: 'scatter',
            color: '#FFC20F',
            data: [{
              x: 'Normal',
              y: [x]
          }]
        }
        ];
        
          const boxPlotOptions = {
            chart: {
              type: 'boxPlot',
              height: 350
            },
            plotOptions: {
              boxPlot: {
                colors: {
                  upper: '#26438E',
                  lower: '#2D81C2'
                }
              }
            },
            xaxis: {
              categories: ['GHI']
            },
            tooltip: {
              fixed: {
                enabled: true, 
                position: 'topLeft', 
                offsetY: 30, 
                offsetX: 60
              }
            },  
          };

          // gráfico de distribuição e regressão linear 
          const regressionSeries = [{
            name: 'Dispersão',
            data: data.map(d => [d.dni, d.ghi]),
            color: '#2D81C2'
          }, {
            name: 'Regressão Linear',
            data: data.map((d, i) => [d.dni, regressionLine[i]]),
            type: 'line',
            color: '#FFC20F'
          }];
          
          const regressionOptions = {
            chart: {
              type: 'scatter',
              height: 350,
            },
            title: {
              text: 'Gráfico Dispersão e Regressão',
              align: 'left', 
              offsetX: 110
            },
            xaxis: {
              type: 'numeric',
              title: {
                text: 'DNI',
                style: {
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#263238'
                }
              },
              labels: {
                formatter: function (val) {
                  return val.toFixed(2);
                },
                style: {
                  fontSize: '12px',
                  colors: '#263238'
                },
                rotate: -45
              },
              tickAmount: 10 
            },
            yaxis: {
              type: 'numeric',
              title: {
                text: 'GHI',
                style: {
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#263238'
                }
              },
              labels: {
                formatter: function (val) {
                  return val.toFixed(2);
                },
                style: {
                  fontSize: '12px',
                  colors: '#263238'
                }
              }
            },
            tooltip: {
              fixed: {
                enabled: true,
                position: 'topLeft',
                offsetY: 30,
                offsetX: 60
              }
            },
          };
          
          
          setState({ series, options, boxPlotSeries, boxPlotOptions, regressionSeries, regressionOptions });

        })

        .catch(error => {
          console.error(error);
        });
    }
  }, [startDate, endDate, x, q1, q3]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleXChange = (event) => {
    setX(event.target.value);
  };


  return (

    <div className='APP'>

    <div id="filtro">
      <div>
        <h6>Data Inicial</h6>
        <input type="date" value={startDate} onChange={handleStartDateChange}/>
      </div>
  
      <div>
        <h6>Data Final</h6>
        <input type="date" value={endDate} onChange={handleEndDateChange}/>
      </div>
  
      <div>
        <h6>Valor distribuição normal</h6>
        <input type="number" value={x} onChange={handleXChange}/> 
      </div>
    </div>

    <Legend items={[
      { color: '#2D81C2', label: ' DNI: Irradiação Solar Direta Normal' }, { color: '#FFC20F', label: 'GHI: Irradiação Solar Global Horizontal' }]}/>
  
    <div class="row"> 
          <div class="row"> 
      <div>
      <h3>Dados Estatísticos</h3>
        <div class="row">
          <div class="card">
            <h3>Normal</h3>
            <p>{distribution}</p>
          </div>
  
          <div class="card">
            <h3>Assimetria</h3>
            <p>{assimetria}</p>
          </div>
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
      </div>
      
      <div>
      <h3>Gráfico de Distribuição Normal</h3>
        <ReactApexChart options={state.boxPlotOptions} series={state.boxPlotSeries} type="boxPlot" height={400} width={600} />
      </div>
    </div>
      <div>
        <div class="row">
          <div class="card">
            <h3>Normal</h3>
            <p>{distribution}</p>
          </div>
  
          <div class="card">
            <h3>Assimetria</h3>
            <p>{assimetria}</p>
          </div>
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
      </div>
      
      <div>
        <ReactApexChart options={state.boxPlotOptions} series={state.boxPlotSeries} type="boxPlot" height={400} width={600} />
      </div>
    </div>

    <div id="chartsScatter">  
    <ReactApexChart options={state.regressionOptions} series={state.regressionSeries} type="scatter" height={400} width={1100} />
    </div>
  
    <div id="chartsLine">  
      <ReactApexChart options={state.options} series={state.series} type="line" height={450} width={1200}/>
    </div>
  
  </div>
  );
};

export default Chart;