import axios from "axios";

const API = "http://localhost:5000/api/leads";

export const processNames = (names) => axios.post(`${API}/process`, { names });

export const getLeads = (status) =>
  axios.get(API, { params: status ? { status } : {} });
