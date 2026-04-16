import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.mensaje || "Error de conexión con el servidor";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;