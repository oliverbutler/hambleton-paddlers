import axios, { AxiosInstance } from "axios";

export const getInstance = (): AxiosInstance => {
  var accessToken: String = "";
  
  if (typeof window !== 'undefined' )
    accessToken = localStorage.getItem("accessToken");

  var headers = {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  var a = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_HOST,
    timeout: 5000,
    headers,
  });

  a.defaults.baseURL = process.env.NEXT_PUBLIC_HOST

  return a
};
