import axios from "axios";

const URL =  process.env.BACKEND

export const api = axios.create({
  baseURL: URL
});
