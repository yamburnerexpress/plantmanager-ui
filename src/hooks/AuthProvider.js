import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URI}/api/auth/login/`, {
        method: "POST",
        body: data,
      });
      const res = await response.json();
      if (res && response.status === 200) {
        setToken(res.access_token);
        setRefreshToken(res.refresh_token);
        localStorage.setItem("site", res.access_token);
        localStorage.setItem("refresh", res.refresh_token)
        navigate("/myplants");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
  
  const getSessionHeaders = () => {
    return {
      Authorization: `Bearer ${token}`
    }
  };

  const logOut = () => {
    setToken("");
    setRefreshToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

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

  const refreshUserToken = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URI}/api/auth/refresh/?token=${localStorage.getItem("refresh")}`
    )
    .then((success) => {
      return success.data
    })
    .catch((e) => {
      console.log("could not refresh token")
      logOut()
    })
  }
  
  // const refreshUserToken = async () => {
  //   try {
  //     const resp = await authFetch.get(`auth/refresh/?token=${localStorage.getItem("refresh")}`);
  //     // console.log("refresh token", resp.data);
  //     return resp.data;
  //   } catch (e) {
  //     console.log("could not refresh token")
  //     Promise.reject(e) 
  //   }
  // };
  
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const resp = await refreshUserToken().then(data => data);
          if (resp) {
            localStorage.setItem("site", resp.access_token);
            authFetch.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${resp.access_token}`;
            return authFetch(originalRequest);
          }
        } catch (e) {
          console.log(e)
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ token, refreshToken, getSessionHeaders, loginAction, logOut, authFetch }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};