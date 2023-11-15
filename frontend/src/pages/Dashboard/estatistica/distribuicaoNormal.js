import { calculateAverage } from './media';
import { calculateStandardDeviation } from './desvioPadrao';
import { calculateMedian } from './mediana';

export const calculateNormalDistribution = (data) => {
  const mean = calculateAverage(data);
  const standardDeviation = calculateStandardDeviation(data);
  const median = calculateMedian(data);

  const exponent = -Math.pow(median - mean, 2) / (2 * Math.pow(standardDeviation, 2));
  const probability = (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, exponent);

  return (probability * 100).toFixed(2) + '%';
};

// import { calculateAverage } from './media';
// import { calculateStandardDeviation } from './desvioPadrao';

// export const calculateNormalDistribution = (data, x) => {
//   const mean = calculateAverage(data);
//   const standardDeviation = calculateStandardDeviation(data);

//   const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(standardDeviation, 2));
//   return (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, exponent);
// };



