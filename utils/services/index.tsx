import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { COOKIES } from '../constants/others/cookies';
import { asyncHandler } from './asyncHandler';

// Function to check if the response status is successful (2xx range)
const checkStatus = (status: number): boolean => status >= 200 && status < 300;

// Base URL for the API, taken from environment variables
export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create an axios client instance with default configurations
const client = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'X-Frame-Options': 'SAMEORIGIN',
  },
  validateStatus: checkStatus,
  timeout: 60000,
});

// Request interceptor to attach the authorization token
client.interceptors.request.use((config) => {
  const accessToken = `Bearer ${Cookies.get(COOKIES.AUTH_TOKEN)}`;
  if (accessToken) {
    config.headers['Authorization'] = accessToken;
  }
  return Promise.resolve(config);
});

// GET request function with async error handling
export const getData = async (
  endpoint: string,
  config: AxiosRequestConfig = {},
  showToast?: boolean,
  setError?: (error: any) => void,
  byPassError?: boolean
): Promise<any> => {
  return await asyncHandler(
    async () =>
      await client.get(endpoint, {
        headers: { Accept: 'application/json' },
        ...config,
      }),
    undefined,
    showToast,
    setError,
    byPassError
  );
};

// POST request function with async error handling
export const postData = async (
  endpoint: string,
  payload: any,
  config: AxiosRequestConfig = {},
  fnName?: string,
  showToast?: boolean,
  setError?: (error: any) => void,
  byPassError?: boolean
): Promise<any> => {
  return await asyncHandler(
    async () => await client.post(endpoint, payload, config),
    fnName,
    showToast,
    setError,
    byPassError
  );
};

// PATCH request function with async error handling
export const patchData = async (
  endpoint: string,
  payload: any,
  fnName?: string,
  showToast?: boolean,
  config: AxiosRequestConfig = {},
  setError?: (error: any) => void
): Promise<any> => {
  return await asyncHandler(
    async () => await client.patch(endpoint, payload, config),
    fnName,
    showToast,
    setError
  );
};

// PUT request function with async error handling
export const putData = async (
  endpoint: string,
  payload: any,
  fnName?: string,
  showToast?: boolean,
  setError?: (error: any) => void
): Promise<any> => {
  return await asyncHandler(
    async () => await client.put(endpoint, payload),
    fnName,
    showToast,
    setError
  );
};

// DELETE request function with async error handling
export const deleteData = async (
  endpoint: string,
  payload?: any,
  fnName?: string,
  showToast?: boolean,
  setError?: (error: any) => void
): Promise<any> => {
  return await asyncHandler(
    async () =>
      await client.delete(endpoint, {
        data: { ...payload },
      }),
    fnName,
    showToast,
    setError
  );
};
