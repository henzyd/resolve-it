import axiosInstance, { axiosPrivate } from "~/config/axios";

class AuthService {
  static login = async (data: { email: string; password: string; rememberMe: boolean }) => {
    const { data: response } = await axiosInstance.post<
      User & {
        access_token: string;
        refresh_token: string;
      }
    >("/auth/login", data);
    return { ...response, rememberMe: data.rememberMe };
  };

  static logout = async (data: { refresh_token: string }) => {
    const { data: response } = await axiosPrivate.post("/auth/logout", data);
    return response;
  };

  static refreshJwt = async ({ refresh }: Record<"refresh", string>) => {
    const { data } = await axiosInstance.post<{
      access: string;
      refresh: string;
    }>("/auth/jwt/refresh", {
      refresh,
    });
    return data;
  };

  static forgotPassword = async (data: Record<"email", string>) => {
    const { data: response } = await axiosInstance.post("/auth/reset-password", data);
    return response;
  };

  static resetPassword = async ({
    path,
    data,
  }: {
    path: Record<"uuid" | "token", string>;
    data: Record<"password" | "re_password", string>;
  }) => {
    const { data: response } = await axiosInstance.post(
      `/auth/reset-password/verify/${path.token}/${path.uuid}/`,
      data
    );
    return response;
  };

  static changePassword = async (
    data: Record<"current_password" | "new_password" | "re_new_password", string>
  ) => {
    const { data: response } = await axiosPrivate.post(`/auth/change/password/`, data);
    return response;
  };

  static requestOtp = async (data: Record<"email", string>) => {
    const { data: response } = await axiosInstance.post("/auth/otp/new", data);
    return response;
  };

  static verifyOtp = async (data: Record<"otp", string>) => {
    const { data: response } = await axiosInstance.post("/auth/otp/verify", data);
    return response;
  };
}

export default AuthService;
