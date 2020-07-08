/* eslint react/prop-types: 0 */
import React, { createContext, useState,useEffect } from 'react'
import AuthService from '../services/AuthService'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const authKey = 'auth';
  const [token, setToken] = useState(localStorage.getItem(authKey));

  useEffect(() => {
    localStorage.setItem(authKey, token);
  }, [token]);

  const authenticateWith = (credentials) => {
    return new Promise((resolve, reject) => {
      AuthService.post(credentials)
        .then(data => {
          setToken(data.token)
          resolve(data);
        })
        .catch(reject);
    })
  }

  const logOut = () => {
    setToken(null);
  };

  const isAuthenticated = () => token != null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logOut, authenticateWith }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
