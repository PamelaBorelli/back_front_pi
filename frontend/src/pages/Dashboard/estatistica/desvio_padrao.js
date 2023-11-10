export const calculateStandardDeviation = (data) => {
  const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
  const total = filteredData.reduce((total, d) => total + d.ghi, 0);
  const mean = total / filteredData.length;
  
  const squaredDifferences = filteredData.map(d => {
    const difference = d.ghi - mean;
    const squaredDifference = difference * difference;
    return squaredDifference;
  });
  
  const sumOfSquaredDifferences = squaredDifferences.reduce((total, val) => total + val, 0);
  const variance = sumOfSquaredDifferences / filteredData.length;
  
  return Number(Math.sqrt(variance).toFixed(2));
};
