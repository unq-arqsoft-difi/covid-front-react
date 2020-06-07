import http from './http-common'

class UsersService {
  post(user) {
    return new Promise((resolve, reject) => {
      http.post('/users', user)
        .then(response => { resolve(response.data) })
        .catch(error => {
          if (error.response) { reject(error.response.data) }
        })
    })
  }
}

export default new UsersService()
