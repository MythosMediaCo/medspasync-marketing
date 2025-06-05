import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://medspasync-backend-production.up.railway.app/api',
})
