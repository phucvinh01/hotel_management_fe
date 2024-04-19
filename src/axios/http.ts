import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      withCredentials: true
    })
  }
}

const http = new Http().instance

export default http