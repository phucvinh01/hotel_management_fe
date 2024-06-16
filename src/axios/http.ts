import axios, { AxiosInstance, AxiosError } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://192.168.1.66:8000/api/',
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      },
    })
  }
}

const http = new Http().instance

export default http