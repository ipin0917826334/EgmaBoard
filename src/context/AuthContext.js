import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userData"));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("userData"));
  }, [userData]);

  return (
    <AuthContext.Provider value={{ userData, setUserData, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
