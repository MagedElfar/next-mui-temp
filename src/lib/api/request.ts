import type { Method, AxiosRequestConfig } from 'axios';

import { http as axiosInstance } from './client';

export const request = async <T>(
  method: Method,
  url: string,
  data?: unknown,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;

  try {
    const response = await axiosInstance.request<T>({
      method,
      url: `${cleanUrl}`,
      data,
      ...config,
    });

    return response.data;
  } catch (error: any) {

    // 💡 إذا كان الخطأ قادم من سيرفر API وله Response
    if (error.response?.data) {
      // نرمي الـ data المباشرة لكي تستقبلها errorMapper أو Catch Block بسهولة
      throw error.response.data;
    }

    // إذا كان الخطأ بسبب انقطاع شبكة أو مشكلة أخرى
    throw error;
  }
};

type ApiId = string | number;

export const axiosApiService = {
  getMany: <T, P extends object = object>(url: string, params?: P, config?: AxiosRequestConfig) =>
    request<T>('GET', url, undefined, { ...config, params }),

  getById: <T>(url: string, id: ApiId, config?: AxiosRequestConfig) =>
    request<T>('GET', `${url}/${id}`, undefined, config),

  getOne: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>('GET', url, undefined, config),

  post: async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    request<T>('POST', url, data, config),

  patch: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    request<T>('PATCH', url, data, config),

  put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    request<T>('PUT', url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>('DELETE', url, undefined, config),

  // multipart upload — let the browser set the boundary, don't force JSON
  upload: <T>(url: string, file: File, field = 'file', config?: AxiosRequestConfig) => {
    const form = new FormData();
    form.append(field, file);
    return request<T>('POST', url, form, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data', ...(config?.headers ?? {}) },
    });
  },
};