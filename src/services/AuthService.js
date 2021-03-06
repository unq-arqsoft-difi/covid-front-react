import http from './http-common';

const AuthService = {
  post: user => new Promise((resolve, reject) => {
    http
      .post('/session', user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        }
      });
  }),
};

export default AuthService;
