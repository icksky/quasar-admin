import { RouteConfig } from 'vue-router'

import { request } from 'boot/axios'

interface LoginResponse {
  token: string
}

export interface LoginData {
  username: string
  password: string
}

interface UserInfoResponse {
  name: string
  email: string
  avatar?: string
}

export const getUserInfo = () =>
  request<ResponseData<UserInfoResponse>>({
    url: '/users/info',
    method: 'POST',
  })

export const login = (data: LoginData) =>
  request<ResponseData<LoginResponse>>({
    url: '/users/login',
    method: 'POST',
    data,
  })

export const logout = () =>
  request<ResponseBase>({
    url: '/users/logout',
    method: 'POST',
  })

export const getRouter = () =>
  request<ResponseData<RouteConfig[]>>({
    url: '/users/routes',
  })
