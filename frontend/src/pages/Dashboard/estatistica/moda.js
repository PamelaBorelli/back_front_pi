export const calculateMode = (data) => {
  const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
  
  const counts = filteredData.reduce((counts, d) => {
    counts[d.ghi] = (counts[d.ghi] || 0) + 1;
    return counts;
  }, {});
  
  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const modes = sortedCounts.slice(0, 3).map(([value]) => value);
  
  return formatData(modes);
};

const formatData = (data) => {
  return data.join(', ');
};

  