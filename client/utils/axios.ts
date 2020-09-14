import axios, { AxiosInstance } from "axios";

export const getInstance = (): AxiosInstance => {
  const accessToken: String = localStorage.getItem("accessToken");

  var headers = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  console.log(process.env.NEXT_PUBLIC_HOST);

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    timeout: 1000,
    headers,
  });
};
