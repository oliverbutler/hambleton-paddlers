import axios, { AxiosInstance } from "axios";

export const getInstance = (): AxiosInstance => {
  const accessToken: String = localStorage.getItem("accessToken");

  var headers = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    timeout: 1000,
    headers,
  });
};
