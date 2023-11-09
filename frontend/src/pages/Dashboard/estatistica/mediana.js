export const calculateMedian = (data) => {
    const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
    const sortedData = filteredData.sort((a, b) => a.ghi - b.ghi);
    
    const half = Math.floor(sortedData.length / 2);
  
    if (sortedData.length % 2)
      return sortedData[half].ghi;
    else
      return (sortedData[half - 1].ghi + sortedData[half].ghi) / 2.0;
  };
  