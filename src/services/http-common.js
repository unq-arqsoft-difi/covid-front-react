import axios from 'axios'

export default axios.create({
  // eslint-disable-next-line no-undef
  baseURL: 'http://localhost:9001/',
  headers: {
    'Content-type': 'application/json'
  }
})
