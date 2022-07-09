import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((req) => {
  const arrCookies = document.cookie.split("; ");
  const accessToken = arrCookies.find((x) => /accessToken=/.test(x))
    ? arrCookies.find((x) => /accessToken=/.test(x)).split("accessToken=")[1]
    : "";

  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`;
  }
  return req;
});

export default axiosInstance;
