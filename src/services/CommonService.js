import http from './http-common'

class ProvincesService {
  get() {
    return new Promise((resolve, reject) => {
      http.get('/support/provinces')
        .then(response => { resolve(response.data) })
        .catch(error => {
          if (error.response) { reject(error.response.data) }
        })
    })
  }
}

export default new ProvincesService()
