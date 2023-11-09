// export const calculateMode = (data) => {
//     const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
    
//     const counts = filteredData.reduce((counts, d) => {
//       counts[d.ghi] = (counts[d.ghi] || 0) + 1;
//       return counts;
//     }, {});
    
//     let maxCount = 0;
//     let modes = [];
    
//     for (const ghi in counts) {
//       if (counts[ghi] > maxCount) {
//         modes = [ghi];
//         maxCount = counts[ghi];
//       } else if (counts[ghi] === maxCount) {
//         modes.push(ghi);
//       }
//     }
    
//     return modes;
//   };
  
  export const calculateMode = (data) => {
    const filteredData = data.filter(d => d.ghi && d.ghi !== 0);
    
    const counts = filteredData.reduce((counts, d) => {
      counts[d.ghi] = (counts[d.ghi] || 0) + 1;
      return counts;
    }, {});
    
    let maxCount = 0;
    let modes = [];
    
    for (const ghi in counts) {
      if (counts[ghi] > maxCount) {
        modes = [ghi];
        maxCount = counts[ghi];
      } else if (counts[ghi] === maxCount) {
        modes.push(ghi);
      }
    }
    
    return formatData(modes);
  };
  
  const formatData = (data) => {
    const strData = data.toString();
    let formattedData = '';
   
    for (let i = 0; i < strData.length; i += 3) {
      formattedData += strData.slice(i, i + 3) + ', ';
    }
    
    return formattedData.slice(0, -2);  // Remove the last comma and space
  };
  