import axios from "axios";
const BACKEND_DOMAIN = "https://inter-chat-app.onrender.com";

export const fetchInterests = async () => {
  const res = await axios(`${BACKEND_DOMAIN}/interests`);
  const result = res.data;
  return result;
};

export const createInterest = async (data) => {
  const res = await axios.post(`${BACKEND_DOMAIN}/createInterest`, {
    ...data,
  });
  const result = res.data;
  return result;
};
