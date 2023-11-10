export const calculateKurtosis = (data) => {
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
    const standardDeviation = Math.sqrt(variance);
    
    const fourthMoment = filteredData.reduce((total, d) => {
      const difference = d.ghi - mean;
      const fourthPower = difference * difference * difference * difference;
      return total + fourthPower;
    }, 0) / filteredData.length;
    
    return ((fourthMoment / (standardDeviation * standardDeviation * standardDeviation * standardDeviation)) - 3).toFixed(2);
  };
  