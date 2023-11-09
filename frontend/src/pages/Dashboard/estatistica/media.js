export const calculateAverage = (data) => {
    const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
    const total = filteredData.reduce((total, d) => total + d.ghi, 0);
    
    return total / filteredData.length;
  };
  