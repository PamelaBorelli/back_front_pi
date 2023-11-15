// import regression from 'regression';

// export const calculeLinearRegression = (data) =>{
//     const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
//     const xyData = filteredData.map(d => [d.x, d.y]);
//     const result = regression.linear(xyData);

//     return result;
// }


import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import regression from 'regression';

const ScatterChart = ({ data }) => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (data) {
            const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
            const xyData = filteredData.map(d => [d.dni, d.ghi]);
            const result = regression.linear(xyData);

            setSeries([{
                name: 'Dados',
                data: xyData
            }, {
                name: 'Regressão Linear',
                data: result.points,
                type: 'points'
            }]);
        }
    }, [data]);

    const options = {
        chart: {
            type: 'scatter',
            height: 350
        },
        xaxis: {
            tickAmount: 10,
            labels: {
                formatter: function(val) {
                    return parseFloat(val).toFixed(1)
                }
            }
        },
        yaxis: {
            tickAmount: 7
        }
    };

    return <Chart options={options} series={series} type="scatter" height={350} />
}
export default ScatterChart;


// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import regression from 'regression';

// const fetchData = async (startDate, endDate) => {
//     // Implemente a função para buscar os dados
// };

// const calculateAverage = (data) => {
//     // Implemente a função para calcular a média
// };

// const calculateMedian = (data) => {
//     // Implemente a função para calcular a mediana
// };

// const calculateStandardDeviation = (data) => {
//     // Implemente a função para calcular o desvio padrão
// };

// const calculateMode = (data) => {
//     // Implemente a função para calcular a moda
// };

// const calculateSkewness = (data) => {
//     // Implemente a função para calcular a assimetria
// };

// const calculateKurtosis = (data) => {
//     // Implemente a função para calcular a curtose
// };

// export const ScatterChart = () => {
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [series, setSeries] = useState([]);

//     useEffect(() => {
//         if (startDate && endDate) {
//             fetchData(startDate, endDate)
//                 .then(data => {
//                     const media = calculateAverage(data);
//                     const mediana = calculateMedian(data);
//                     const desvioPadrao = calculateStandardDeviation(data);
//                     const moda = calculateMode(data);
//                     const assimetria = calculateSkewness(data);
//                     const curtose = calculateKurtosis(data);

//                     const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
//                     const xyData = filteredData.map(d => [d.x, d.y]);
//                     const result = regression.linear(xyData);

//                     const seriesScatter = [
//                         {name: 'Temp. do ar', type: 'column', data: data.map(d => d.air_temp), color: "#26438E"},
//                         {name: 'DNI', type: 'column', data: data.map(d => d.dni), color: '#2D81C2'},
//                         {name: 'GHI', type: 'line', data: data.map(d => d.ghi), color: '#FFC20F'},
//                         {name: 'Regressão Linear', type: 'line', data: result.points, color: '#FF0000'},
//                     ];

//                     setSeries(seriesScatter);
//                 });
//         }
//     }, [startDate, endDate]);

//     const optionsScatter = {
//         chart: {
//             type: 'scatter',
//             height: 350
//         },
//         xaxis: {
//             tickAmount: 10,
//             labels: {
//                 formatter: function(val) {
//                     return parseFloat(val).toFixed(1)
//                 }
//             }
//         },
//         yaxis: {
//             tickAmount: 7
//         }
//     };

//     return <ChartScatter options={optionsScatter} series={seriesScatter} type="scatter" height={350} />
// }



