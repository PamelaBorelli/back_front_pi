export const calculateQuartile = (data, quartile) => {
    const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
    const sortedData = filteredData.sort((a, b) => a.ghi - b.ghi);
  
    const index = Math.floor(sortedData.length * quartile);
    const rest = sortedData.length * quartile - index;
  
    if (sortedData[index + 1] !== undefined) {
      return sortedData[index].ghi + rest * (sortedData[index + 1].ghi - sortedData[index].ghi);
    } else {
      return sortedData[index].ghi;
    }
  };
  
  // primeiro quartil (Q1)
  export const calculateFirstQuartile = (data) => {
    return calculateQuartile(data, 0.25);
  };
  
  // terceiro quartil (Q3)
  export const calculateThirdQuartile = (data) => {
    return calculateQuartile(data, 0.75);
  };
  