import { calculateAverage } from './media';
import { calculateStandardDeviation } from './desvioPadrao';

export const calculateNormalDistribution = (data, x) => {
  const mean = calculateAverage(data);
  const standardDeviation = calculateStandardDeviation(data);

  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(standardDeviation, 2));
  const probability = (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, exponent);

  return (probability * 10000).toFixed(2) + '%';
};







