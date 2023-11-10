export const calculateSkewness = (data) => {
    const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
    const total = filteredData.reduce((total, d) => total + d.ghi, 0);
    const mean = total / filteredData.length;
    
    const sortedData = filteredData.map(d => d.ghi).sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);
    const median = sortedData.length % 2 === 0 ? (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2 : sortedData[middleIndex];
    
    const squaredDifferences = filteredData.map(d => {
      const difference = d.ghi - mean;
      const squaredDifference = difference * difference;
      return squaredDifference;
    });
    
    const sumOfSquaredDifferences = squaredDifferences.reduce((total, val) => total + val, 0);
    const variance = sumOfSquaredDifferences / filteredData.length;
    const standardDeviation = Math.sqrt(variance);
    
    return ((3 * (mean - median)) / standardDeviation).toFixed(2);
  };
  