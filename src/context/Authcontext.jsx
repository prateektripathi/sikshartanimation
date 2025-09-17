import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../data/allapi";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usertoken, setusertoken] = useState(localStorage.getItem("token"));
  const [userdata, setuserdata] = useState(null);

  const settoken = (token) => {
    setusertoken(token);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  const logoutuser = () => {
    setusertoken(null);
    setuserdata(null);
    localStorage.removeItem("token");
  };

  const isloggedin = !!usertoken;

  const userauthentication = async () => {
    if (!usertoken) return; // agar token hi nahi hai to API call mat karo

    try {
      const response = await fetch(auth.USER_AUTHORIZATION_FOR_PROFILE, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${usertoken}`, // ✅ fixed
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const mydata = await response.json();
        if (mydata.user) {
          setuserdata(mydata.user);
        }
      } else {
        console.warn("Unauthorized or invalid token");
        logoutuser(); // token invalid hua to logout
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  };

  useEffect(() => {
    userauthentication();
  }, [usertoken]);

  return (
    <AuthContext.Provider
      value={{
        usertoken,
        settoken,
        logoutuser,
        userdata,
        setuserdata,
        isloggedin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
