import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createQuery = (query: object) => {
  return qs.stringify(query, {
    encodeValuesOnly: true,
  });
};
