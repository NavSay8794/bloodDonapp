import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bloodDonToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (user) => {
  try {
    const resp = await axiosInstance.post('/user/register', user)
    return resp
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user) => {
  try {
    const resp = await axiosInstance.post('/user/login', user)
    return resp
  } catch (error) {
    console.log(error);
  }
};

//blood request

export const getAllRequests = async () => {
  try {
    const resp = await axiosInstance.get('/bloodReq')
    return resp
  } catch (error) {
    console.log(error);
  }
};

export const createRequest = async (bloodReq) => {
  try {
    const resp = await axiosInstance.post('/bloodReq/new', bloodReq)
    return resp
  } catch (error) {
    console.log(error);
  }
};

export const getRequest = async (reqId) => {
  try {
    const resp = await axiosInstance.get(`/bloodReq/${reqId}`)
    return resp
  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = async (updatedReqData, reqId) => {
  try {
    const resp = await axiosInstance.put(`/bloodReq/${reqId}`, updatedReqData)
    return resp
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequest = async (reqId) => {
  try {
    const resp = await axiosInstance.delete(`/bloodReq/${reqId}`)
    return resp
  } catch (error) {
    console.log(error);
  }
};
