import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("/api/auth/login/", {
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
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, getSessionHeaders, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};