import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://qew8ju40kh.execute-api.sa-east-1.amazonaws.com",
});
