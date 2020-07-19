import http from './http-common';

const UsersService = {
  post: (user) => new Promise((resolve, reject) => {
    http
      .post('/users', user)
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

export default UsersService;
