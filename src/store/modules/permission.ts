import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'

import store from 'src/store'
import { constantRoutes, asyncRoutes, asyncRoutesMap } from 'src/router'
import { getRouter } from 'src/api/user'

export const pretreatAsyncRoutes = (routes: RouteConfig[]) => {
  return routes.reduce((prev, curr) => {
    curr.component = asyncRoutesMap(curr.component as string) || curr.component
    if (curr.children) {
      curr.children = pretreatAsyncRoutes(curr.children)
    }
    return prev.concat(curr)
  }, [] as RouteConfig[])
}

export interface PermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []

  @Mutation
  private SET_ROUTES (routes: RouteConfig[]) {
    this.dynamicRoutes = routes
    this.routes = constantRoutes.concat(this.dynamicRoutes)
  }

  @Action({ rawError: true })
  public async GenerateRoutes () {
    let data: RouteConfig[] = []
    ;({ data } = await getRouter())
    if (!data) data = []
    this.SET_ROUTES(pretreatAsyncRoutes(data.concat(asyncRoutes)))
  }
}

export const PermissionModule = getModule(Permission)
