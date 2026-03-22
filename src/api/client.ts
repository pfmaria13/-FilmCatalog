import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY

export const apiClient = axios.create({
  baseURL: 'https://api.poiskkino.dev',
  headers: {
    'X-API-KEY': apiKey ?? '',
  },
})
