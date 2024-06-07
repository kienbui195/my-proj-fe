import axios from "axios";

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
};

export default apis;
