/* eslint react/prop-types: 0 */
import React, { createContext, useState } from 'react'
import AuthService from '../services/AuthService'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const authKey = 'auth';
  const initializeToken = () => {
    return (localStorage.getItem(authKey) || null);
  };

  const [token, setToken] = useState(initializeToken());

  const authenticateWith = (credentials) => {
    return new Promise((resolve, reject) => {
      AuthService.post(credentials)
        .then(data => {
          saveAuthInfo(data);
          resolve(data);
        })
        .catch(reject)
    })
  }

  const logOut = () => {
    setToken(null);
    localStorage.setItem(authKey,null)
  };

  const isAuthenticated = () => token != null

  // Private methods
  const saveAuthInfo = (authInfo) => {
    setToken(authInfo.token)}
  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logOut, authenticateWith }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
