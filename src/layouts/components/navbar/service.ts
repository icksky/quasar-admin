import { request } from 'boot/axios'
import { NavbarNotifiesData } from './data'

export const getNavbarNotifies = () =>
  request<ResponseData<NavbarNotifiesData>>({
    url: 'demo/navbar/notifies',
  })
