/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'
import { Notify } from 'quasar'
import { boot } from 'quasar/wrappers'

import { UserModule } from 'store/user'
import { RESPONSE_ERROR } from 'src/constant/error-message'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export const service = axios.create({
  baseURL: process.env.API,
  timeout: 5000,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = service.request.bind(service) as <T = any>(...args: Parameters<AxiosInstance['request']>) => Promise<T>

const buildErrorMessage = (data: ResponseBase) =>
  `[${data.code || '-'}] ${data.msg || RESPONSE_ERROR}`

service.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers.Authorization = UserModule.token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  async response => {
    const res: ResponseBase = response.data
    if (res.code !== 0) {
      const errorMessage = buildErrorMessage(res)
      Notify.create({
        message: errorMessage,
        type: 'negative',
      })
      return Promise.reject(new Error(errorMessage))
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res as unknown as AxiosPromise
    }
  },
  error => {
    const response = error.response as AxiosResponse<ResponseBase> | undefined
    let message
    if (response) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message = `${response.statusText}[${response.status}]: `
      if (response.data && response.data.msg) {
        message += buildErrorMessage(response.data)
      } else {
        message += error.message
      }
    }
    Notify.create({
      message,
      type: 'negative',
    })
    return Promise.reject(error)
  },
)

export default boot(({ Vue }) => {
  Vue.prototype.$axios = service
})
