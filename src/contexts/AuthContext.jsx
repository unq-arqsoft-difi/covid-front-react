/* eslint react/prop-types: 0 */
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('authData') || '{}'));

  useEffect(() => localStorage.setItem('authData', JSON.stringify(authData)), [authData]);

  const authenticateWith = async (credentials) => {
    const data = await AuthService.post(credentials);
    setAuthData(data);
  };

  const logOut = () => setAuthData({});

  const isAuthenticated = () => !!authData.token;

  return (
    <AuthContext.Provider
      value={{
        authData,
        authenticateWith,
        isAdmin: authData.admin,
        isAuthenticated,
        logOut,
        token: authData.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
