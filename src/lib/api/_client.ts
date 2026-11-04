import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { AuthResult } from "@/features/auth/types/api";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string | undefined,
    message: string,
    public readonly details?: any // 👈 إضافة details ليحفظ المصفوفات مثل [ "property gender...", "password..." ]
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Per-request flags carried through axios config.
type Extra = {
  /** Attach the access token + attempt refresh on 401. Default true. */
  authRequired?: boolean;
  /** Internal: guards against infinite refresh→retry loops. */
  _retried?: boolean;
};

/** Shared axios instance. */
export const http = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach the bearer token unless the call opts out.
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const cfg = config as InternalAxiosRequestConfig & Extra;
  if (cfg.authRequired !== false) {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      cfg.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return cfg;
});

// Single-flight refresh: concurrent 401s share one refresh round-trip.
let refreshInFlight: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  const { refreshToken, setSession, clear } = useAuthStore.getState();
  if (!refreshToken) return false;
  try {
    const { data } = await axios.post<AuthResult>(
      `${API_URL}/auth/refresh`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );
    setSession(data);
    return true;
  } catch {
    clear();
    return false;
  }
}

// Response interceptor — refresh-and-retry on 401, normalize errors to ApiError.
http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const cfg = error.config as
      | (InternalAxiosRequestConfig & Extra)
      | undefined;
    const status = error.response?.status;

    if (status === 401 && cfg && cfg.authRequired !== false && !cfg._retried) {
      cfg._retried = true;
      refreshInFlight ??= refreshSession().finally(() => {
        refreshInFlight = null;
      });
      if (await refreshInFlight) {
        return http(cfg);
      }
      useAuthStore.getState().clear();
    }

    // 💡 استخراج البيانات القادمة من السيرفر بشكل دقيق
    const rawData = error.response?.data as any;

    // التعامل مع نمط الـ API القادم لديك: { error: { code, message, details } }
    const serverError = rawData?.error || rawData;

    const code = serverError?.code;
    const details = serverError?.details || rawData?.details || rawData?.message;

    let message = serverError?.message || error.message;

    // إذا كانت الرسالة عبارة عن مصفوفة نصوص
    if (Array.isArray(message)) {
      message = message.join(", ");
    }

    return Promise.reject(new ApiError(status ?? 0, code, message, details));
  }
);

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
}

/** Thin typed wrapper over the axios instance used by all endpoint helpers. */
export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, auth = true } = options;
  const config: AxiosRequestConfig & Extra = {
    url: path,
    method,
    data: body,
    authRequired: auth,
  };
  const response = await http.request<T>(config);
  return response.status === 204 ? (undefined as T) : response.data;
}