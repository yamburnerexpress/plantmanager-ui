import axios from "axios";

const authFetch = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api/`,
  headers: {
    "Content-type": "application/json",
  }
});

authFetch.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("site");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const resp = await authFetch.get(`auth/refresh/?token=${localStorage.getItem("refresh")}`);
    console.log("refresh token", resp.data);
    return resp.data;
  } catch (e) {
    console.log("Error",e);   
  }
};

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await refreshToken();

      const access_token = resp.access_token;

      localStorage.setItem("site", access_token);
      authFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      return authFetch(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default authFetch;