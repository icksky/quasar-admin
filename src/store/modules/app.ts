import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import store from 'src/store'

export interface APPState {
  activeMenu: string
  sidebar: boolean
}

@Module({ dynamic: true, store, name: 'APP' })
class APP extends VuexModule implements APPState {
  public activeMenu = '/'
  public sidebar = true

  @Mutation
  public SET_ACTIVE_MENU (menu = '/') {
    this.activeMenu = menu
  }

  @Mutation
  public TOGGLE_SIDEBAR (isShow?: boolean) {
    if (isShow === undefined) {
      this.sidebar = !this.sidebar
    } else {
      this.sidebar = isShow
    }
  }
}

export const APPModule = getModule(APP)
