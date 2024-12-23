import axios, { InternalAxiosRequestConfig } from "axios";
import { config } from "process";

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-latest-m8nf.onrender.com/'
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const setupResponseInterceptor = (navigate: any) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response?.status === 401) {
                navigate("/login", { replace: true });
            }
            return Promise.reject(error);
        }
    )
}


export default axiosInstance;