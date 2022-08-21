import axios from "axios";

axios.interceptors.request.use(async function (config) {
  const user = await localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user)?.token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axios;
