import { Cookies } from 'quasar'

// User
const tokenKey = 'quasar_admin_token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)
