import { RouteConfig } from 'vue-router'

const Layout = () => import('src/layouts/main-layout.vue')

const map: {
  [key:string]: RouteConfig['component']
} = {
  layout: Layout,
}

const asyncRoutesMap = (key: string) => {
  if (map[key]) {
    return map[key]
  }
  if (`${key}`.toLowerCase().includes('layout')) {
    return Layout
  }
  return null
}

export default asyncRoutesMap
