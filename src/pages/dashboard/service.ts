import { request } from 'boot/axios'

export interface ProjectData {
  leader: {
    name: string
    email: string
    avatar: string
  }
  project: string
  team: string[]
  status: string
  weeks: number
  budget: number
}

export const getProductList = () =>
  request<ResponseData<ProjectData[]>>({
    url: 'demo/dashboard/product-list',
  })
