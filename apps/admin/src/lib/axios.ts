import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.stonxis.com',
    withCredentials: true
})