import axios from "axios";

const API = "https://leadstask.onrender.com/api/leads";

export const processNames = (names) => axios.post(`${API}/process`, { names });

export const getLeads = (status) =>
  axios.get(API, { params: status ? { status } : {} });
