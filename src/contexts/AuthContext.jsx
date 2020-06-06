/* eslint react/prop-types: 0 */
import React, { createContext, useState } from 'react'
import AuthService from '../services/AuthService'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const authenticateWith = (credentials) => {
    return new Promise((resolve, reject) => {
      AuthService.post(credentials)
        .then(data => {
          saveAuthInfo(data);
          resolve(data);
        }
        )
        .catch(reject)
    })
  }
  const logOut = () => {
    setIsAuthenticated(false);
    setToken(null);
  };
  // Private methods
  const saveAuthInfo = (authInfo) => {
    setIsAuthenticated(true);
    setToken(authInfo.token);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logOut, authenticateWith }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
