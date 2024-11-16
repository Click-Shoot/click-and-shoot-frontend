// services/apiService.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

// Base API configuration
const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzM4OGJhNTllYjViODZjM2ViMmYzNjkiLCJlbWFpbCI6ImpqQHRlc3QuY29tIiwiZXhwIjoxNzMxNzcyMjkxfQ.XpzCdnBIoKU3F6ZbgpjkLoga8XNVNrRhpS-8DgFd0Ug'
        // localStorage.getItem('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API Service class
class ApiService {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        console.log('ddd')
        const response = await apiClient.get<T>(url, config);
        console.log('out')
        return response.data;
    }

    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await apiClient.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await apiClient.put<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await apiClient.delete<T>(url, config);
        return response.data;
    }
}


const apiService = new ApiService();

export default apiService;
