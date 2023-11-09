import axios from "axios";

export const fetchData = async (startDate, endDate) => {
  const response = await axios.get(`http://localhost:3000/api/dashboards/${startDate}/${endDate}/?limit=168`);
  
  return response.data;
};
