import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { obterTokenAutomaticamente, renovarToken } from 'services/authService';
import env from 'config/env';

const api: AxiosInstance = axios.create({
  baseURL: env.REACT_APP_API_URL,
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}


const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = await obterTokenAutomaticamente();
  if (token && config && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}

const onRequestError = (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};


const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosResponse<unknown>> => {
  const originalRequest = error.config as CustomAxiosRequestConfig

  if (error?.response?.status === 401 && originalRequest.headers && !originalRequest?._retry) {
    originalRequest._retry = true;

    try {
      const newToken = await renovarToken();
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    } catch (tokenRenewError) {
      return Promise.reject(tokenRenewError);
    }
  }

  return Promise.reject(error);
};


api.interceptors.request.use(
  onRequest,
  onRequestError
);

api.interceptors.response.use(
  onResponse,
  onResponseError
);


export default api;