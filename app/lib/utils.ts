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

export function filterPrivateValues<T>(values: T): T {
  if (!values || typeof values !== "object") {
    return values;
  }

  if (values instanceof File) return values;

  if (Array.isArray(values)) {
    return values.map((item) => filterPrivateValues(item)) as any;
  }

  return Object.fromEntries(
    Object.entries(values as any)
      .filter(([key]) => !key.startsWith("_"))
      .map(([key, value]) => [key, filterPrivateValues(value)])
  ) as T;
}
