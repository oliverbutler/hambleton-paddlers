import axios, { AxiosInstance } from "axios";

export const getInstance = (): AxiosInstance => {
  var accessToken: String = "";
  
  if (typeof localStorage !== 'undefined')
    accessToken = localStorage.getItem("accessToken");

  var headers = {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;


  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    timeout: 2500,
    headers,
  });
};
