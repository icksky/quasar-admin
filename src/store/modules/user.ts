import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'

import { getToken, removeToken, setToken } from 'src/utils/cookies'
import store from 'src/store'
import { getUserInfo, login, LoginData, logout } from 'src/api/user'

export interface UserState {
  token: string
  name: string
  email: string
  avatar: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public email = ''

  @Mutation
  private SET_TOKEN (token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME (name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR (avatar?: string) {
    avatar && (this.avatar = avatar)
  }

  @Mutation
  private SET_EMAIL (email: string) {
    email && (this.email = email)
  }

  @Action({ rawError: true })
  public ResetLogin () {
    removeToken()
    this.SET_TOKEN('')
    this.SET_NAME('')
    this.SET_EMAIL('')
    this.SET_AVATAR('')
  }

  @Action({ rawError: true })
  public async Login (userInfo: LoginData) {
    const { data } = await login({ ...userInfo })
    setToken(data.token)
    this.SET_TOKEN(data.token)
  }

  @Action({ rawError: true })
  public async GetUserInfo () {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo()
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { name, avatar, email } = data
    this.SET_EMAIL(email)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
  }

  @Action({ rawError: true })
  public async LogOut () {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    this.ResetLogin()
  }
}

export const UserModule = getModule(User)
