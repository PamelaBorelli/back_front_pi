import axios from "axios";

export const fetchData = async (startDate, endDate) => {
  const response = await axios.get(`http://localhost:8000/dadosSolares/?startDate=${startDate}&endDate=${endDate}`);
  
  return response.data;
};
