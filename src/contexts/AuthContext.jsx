/* eslint react/prop-types: 0 */
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const authKey = 'auth';
  const isAdminKey = 'isAdmin';
  const [token, setToken] = useState(localStorage.getItem(authKey));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem(isAdminKey));

  useEffect(() => {
    localStorage.setItem(authKey, token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem(isAdminKey, isAdmin);
  }, [isAdmin]);

  const authenticateWith = (credentials) => new Promise((resolve, reject) => {
    AuthService.post(credentials)
      .then((data) => {
        setIsAdmin(data.admin);
        setToken(data.token);
        resolve(data);
      })
      .catch(reject);
  });

  const logOut = () => {
    setToken(null);
    setIsAdmin(false);
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        logOut,
        authenticateWith,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
