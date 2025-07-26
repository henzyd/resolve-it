import axios from "axios";
import AuthService from "~/services/auth";
import { JWT_KEY } from "~/lib/constants";
import { getToken } from "~/lib/utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    common: {
      Accept: "application/json",
    },
    post: {
      "Content-Type": "application/json",
    },
  },
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    common: {
      Accept: "application/json",
    },
    post: {
      "Content-Type": "application/json",
    },
  },
});

function logout() {
  localStorage.removeItem(JWT_KEY);
  sessionStorage.removeItem(JWT_KEY);
  window.location.href = `/login?origin=${window.location.pathname}`;
}

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.response?.data?.non_field_errors ||
      error?.response?.data ||
      error?.message ||
      "Network Error";

    const status = error?.response?.status;

    if (status === 401) {
      if (message === "Token is invalid or expired" || message === "Token is blacklisted") {
        logout();
      } else {
        const sessionToken = sessionStorage.getItem(JWT_KEY);
        const refreshToken = getToken();

        if (!refreshToken) {
          return logout();
        }

        try {
          const { access_token, refresh_token } = await AuthService.refreshJwt({
            refresh_token: refreshToken,
          });
          if (access_token && refresh_token) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            axiosPrivate.defaults.headers.common["Authorization"] = "Bearer " + access_token;

            const stringifiedRefresh = JSON.stringify(refresh_token);

            if (sessionToken) {
              sessionStorage.setItem(JWT_KEY, stringifiedRefresh);
            } else {
              localStorage.setItem(JWT_KEY, stringifiedRefresh);
            }
          }
        } catch {
          return logout();
        }

        return axiosPrivate.request(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
