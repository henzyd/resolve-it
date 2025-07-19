import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JWT_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToken() {
  const sessionToken = sessionStorage.getItem(JWT_KEY);
  const localToken = localStorage.getItem(JWT_KEY);
  let refreshToken = sessionToken || localToken;
  refreshToken = refreshToken ? JSON.parse(refreshToken) : undefined;
  return refreshToken;
}
