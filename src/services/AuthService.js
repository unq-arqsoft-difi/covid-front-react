import http from './http-common'

class AuthService {
  post(user) {
    return new Promise((resolve, reject) => {
      http.post('/login', user)
        .then(response => { resolve(response.data) })
        .catch(error => {
          if (error.response) { reject(error.response.data) }
        })
    })
  }
}

export default new AuthService()
