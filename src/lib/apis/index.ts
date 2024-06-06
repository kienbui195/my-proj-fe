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
};

export default apis;
