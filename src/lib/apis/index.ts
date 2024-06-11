import axios from "axios";
import { createQuery } from "../utils";

const apis = {
  login: async ({ email, password }: { email: string; password: string }) => {
    return await axios
      .post(`${process.env.NEXT_PUBLIC_BE}/auth/local`, {
        identifier: email,
        password,
      })
      .then((res) => res)
      .catch((err) => err);
  },

  getUser: async ({ id }: { id: number }) => {
    const isClient = typeof window === "object";
    const userInfo = isClient ? localStorage.getItem("KDEV_USER") : "";
    let token = "";

    if (userInfo) {
      token = JSON.parse(userInfo).token;
    }

    if (id === 0) return;

    return await axios
      .get(`${process.env.NEXT_PUBLIC_BE}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  },

  register: async ({
    username,
    password,
    email,
    role,
  }: {
    username: string;
    password: string;
    email: string;
    role: string;
  }) => {
    return await axios
      .post(`${process.env.NEXT_PUBLIC_BE}/auth/local/register`, {
        username,
        password,
        email,
        user_role: role,
      })
      .then((res) => res)
      .catch((err) => err);
  },

  get: async (url: string, query?: object) => {
    const isClient = typeof window === "object";
    const localToken = isClient
      ? JSON.parse(localStorage.getItem("KDEV_USER") as string)?.token
      : "";

    return await axios
      .get(
        `${process.env.NEXT_PUBLIC_BE}/${url}${
          query ? `?${createQuery(query)}` : ""
        }`,
        {
          headers:
            localToken && localToken !== ""
              ? {
                  Authorization: `Bearer ${localToken}`,
                }
              : {},
        }
      )
      .then((res) => res)
      .catch((err) => err);
  },

  post: async (url: string, data: any) => {
    const isClient = typeof window === "object";
    const localToken = isClient
      ? JSON.parse(localStorage.getItem("KDEV_USER") as string)?.token
      : "";

    return await axios
      .post(
        `${process.env.NEXT_PUBLIC_BE}/${url}`,
        {
          ...data,
        },
        {
          headers:
            localToken && localToken !== ""
              ? {
                  Authorization: `Bearer ${localToken}`,
                }
              : {},
        }
      )
      .then((res) => res)
      .catch((err) => err);
  },

  put: async (url: string, id: number, data: any) => {
    const isClient = typeof window === "object";
    const localToken = isClient
      ? JSON.parse(localStorage.getItem("KDEV_USER") as string)?.token
      : "";

    return await axios
      .put(
        `${process.env.NEXT_PUBLIC_BE}/${url}/${id}`,
        {
          ...data,
        },
        {
          headers:
            localToken && localToken !== ""
              ? {
                  Authorization: `Bearer ${localToken}`,
                }
              : {},
        }
      )
      .then((res) => res)
      .catch((err) => err);
  },

  del: async (url: string, id: number) => {
    const isClient = typeof window === "object";
    const localToken = isClient
      ? JSON.parse(localStorage.getItem("KDEV_USER") as string)?.token
      : "";

    return await axios
      .delete(`${process.env.NEXT_PUBLIC_BE}/${url}/${id}`, {
        headers:
          localToken && localToken !== ""
            ? {
                Authorization: `Bearer ${localToken}`,
              }
            : {},
      })
      .then((res) => res)
      .catch((err) => err);
  },

  getOne: async (url: string, id: number, query?: object) => {
    const isClient = typeof window === "object";
    const localToken = isClient
      ? JSON.parse(localStorage.getItem("KDEV_USER") as string)?.token
      : "";

    return await axios
      .get(
        `${process.env.NEXT_PUBLIC_BE}/${url}/${id}${
          query ? `?${createQuery(query)}` : ""
        }`,
        {
          headers:
            localToken && localToken !== ""
              ? {
                  Authorization: `Bearer ${localToken}`,
                }
              : {},
        }
      )
      .then((res) => res)
      .catch((err) => err);
  },

  upload: async (image: File, fileName?: string) => {
    const isClient = typeof window === "object";
    const localToken = isClient
      ? JSON.parse(localStorage.getItem("KDEV_USER") as string)?.token
      : "";

    const formData = new FormData();
    formData.append("files", image, fileName ?? image.name);

    return await axios
      .post(`${process.env.NEXT_PUBLIC_BE}/upload`, formData, {
        headers:
          localToken && localToken !== ""
            ? {
                Authorization: `Bearer ${localToken}`,
              }
            : {},
      })
      .then((res) => res)
      .catch((err) => err);
  },
};

export default apis;
