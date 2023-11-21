const ss = require('simple-statistics');

export const calculateLinearRegression = (data) => {
  const filteredData = data.filter(d => d.ghi && d.ghi !== 0 && d.dni && d.dni !== 0);

  const ghi = filteredData.map(d => d.ghi);
  const dni = filteredData.map(d => d.dni);

  const regression = ss.linearRegression(dni.map((val, index) => [val, ghi[index]]));

  return regression;
};













