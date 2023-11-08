import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart = () =>{
  const [state, setState] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/dashboards")
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
