import axiosInstance from './axiosInstance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type Method = 'get' | 'post' | 'put' | 'delete';

// Generic request function
export const request = async <RequestType, ResponseType>(
  method: Method,
  url: string,
  data?: RequestType,
  restConfig?: AxiosRequestConfig
) => {
  const axiosRequestConfig: AxiosRequestConfig = {
    method,
    url,
    data,
    ...restConfig,
  };
  try {
    const response: AxiosResponse<ResponseType> =
      await axiosInstance(axiosRequestConfig);
    return response.data;
  } catch (error: any) {
    console.error(`${method.toUpperCase()} request error:`, error);
    // can add more structured error handling here
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Request data:', error.request);
    } else {
      // Something else happened in setting up the request
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

// Convenience methods for common HTTP methods
export const get = <ResponseType>(url: string, config?: AxiosRequestConfig) =>
  request<undefined, ResponseType>('get', url, undefined, config);

export const post = <RequestType, ResponseType>(
  url: string,
  data?: RequestType,
  config?: AxiosRequestConfig
) => request<RequestType, ResponseType>('post', url, data, config);

export const put = <RequestType, ResponseType>(
  url: string,
  data?: RequestType,
  config?: AxiosRequestConfig
) => request<RequestType, ResponseType>('put', url, data, config);

export const del = <ResponseType>(url: string, config?: AxiosRequestConfig) =>
  request<undefined, ResponseType>('delete', url, undefined, config);
