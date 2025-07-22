import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "~/lib/toast";
import { JWT_KEY } from "~/lib/constants";
import AuthService from "~/services/auth";
import { axiosPrivate } from "~/config/axios";
import { useAuth } from "~/store/auth";
import UsersService from "~/services/users";

export function useLogin() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: async (data) => {
      axiosPrivate.defaults.headers.common["Authorization"] = "Bearer " + data.access_token;

      if (data.rememberMe) {
        localStorage.setItem(JWT_KEY, JSON.stringify(data.refresh_token));
        sessionStorage.removeItem(JWT_KEY);
      } else {
        sessionStorage.setItem(JWT_KEY, JSON.stringify(data.refresh_token));
        localStorage.removeItem(JWT_KEY);
      }

      try {
        const userData = await UsersService.getMe();
        setUser(userData);
        notifySuccess({ message: "Login successful" });
      } catch (error) {
        axiosPrivate.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem(JWT_KEY);
        sessionStorage.removeItem(JWT_KEY);
        notifyError({
          message: "Login successful but failed to load user data. Please try again.",
        });
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          notifyError({
            message: "Invalid email or password, please check your inputs and try again",
          });
        } else if (error.response?.status === 401) {
          notifyError({ message: error.response.data.error });
        } else if (error.request?.status === 403) {
          if (error.response?.data?.error === "This account as been blocked") {
            notifyError({
              message: "This account has been blocked by the admin",
            });
          } else {
            notifyError({
              message:
                "You have not activated your account yet, please check your email for activation link",
            });
          }
        }
      } else {
        if (typeof error === "string") {
          notifyError(error);
        }
      }
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: AuthService.signup,
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          const data = error.response.data;
          if (typeof data.email?.[0] === "string") {
            const msg = data.email?.[0];
            return notifyError({
              message: msg.slice(0, 1).toUpperCase() + msg.slice(1),
            });
          }
          notifyError({
            message: "Invalid email or password, please check your inputs and try again",
          });
        } else if (error.response?.status === 401) {
          notifyError({ message: error.response.data.error });
        } else if (error.request?.status === 403) {
          if (error.response?.data?.error === "This account as been blocked") {
            notifyError({ message: "This account has been blocked by the admin" });
          } else {
            notifyError({
              message:
                "You have not activated your account yet, please check your email for activation link",
            });
          }
        }
      } else {
        if (typeof error === "string") {
          notifyError(error);
        }
      }
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
    onError(error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          notifyError({ message: "User with this email does not exist!" });
        } else if (error.response?.status === 403) {
          const errMsg = error.response.data.error as string;
          notifyError({ message: errMsg[0].toUpperCase() + errMsg.slice(1) });
        }
      }
    },
    onSuccess() {
      notifySuccess({ message: "Reset link has been sent to your email" });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: AuthService.changePassword,
    onError(error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          const errMsg = error.response.data.error as string;
          notifyError({ message: errMsg[0].toUpperCase() + errMsg.slice(1) });
        }
      }
    },
    onSuccess() {
      notifySuccess({ message: "Successfully changed password" });
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: AuthService.resetPassword,
    onError(error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          notifyError({
            message: "Token not valid or has expired, please try again",
          });
        } else if (error.response?.status === 401) {
          notifyError({ message: error.response.data.detail });
        }
      }
    },
    onSuccess: () => {
      notifySuccess({
        message: "Password reset successfully!, please login to continue",
      });
    },
  });
}

export function useRequestOtp() {
  return useMutation({
    mutationFn: AuthService.requestOtp,
    onSuccess() {
      notifySuccess({ message: "OTP has been sent to your email!" });
    },
    onError(error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          notifyError({ message: "User with this email does not exist" });
        }
      }
    },
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: AuthService.verifyOtp,
    onSuccess() {
      notifySuccess({ message: "Account verified successfully!" });
    },
    onError(error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          const data = error.response?.data;

          if (data[0] === "OTP expired") {
            notifyError({
              message: "OTP expired!, please request for a new one",
            });
          } else
            notifyError({
              message: "Invalid OTP!, please check your input and try again",
            });
        }
      }
    },
  });
}
