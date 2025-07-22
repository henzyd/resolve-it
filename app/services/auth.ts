import axiosInstance, { axiosPrivate } from "~/config/axios";

type Token = {
  access_token: string;
  refresh_token: string;
};

class AuthService {
  static login = async (data: { email: string; password: string; rememberMe: boolean }) => {
    const { data: response } = await axiosInstance.post<User & Token>("/auth/login", data);
    return { ...response, rememberMe: data.rememberMe };
  };

  static signup = async (
    data: Record<"first_name" | "last_name" | "email" | "password", string>
  ) => {
    const { data: response } = await axiosInstance.post("/auth/signup", data);
    return response;
  };

  static logout = async (data: { refresh_token: string }) => {
    const { data: response } = await axiosPrivate.post("/auth/logout", data);
    return response;
  };

  static refreshJwt = async ({ refresh_token }: Record<"refresh_token", string>) => {
    const { data } = await axiosInstance.post<Token>("/auth/jwt/refresh", {
      refresh_token,
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
