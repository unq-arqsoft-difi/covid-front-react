/* eslint react/prop-types: 0 */
import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const authenticate = (aToken) => {
    setIsAuthenticated(true);
    setToken(aToken);
  };
  const logOut = () => {
    setIsAuthenticated(false);
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, token, authenticate, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
