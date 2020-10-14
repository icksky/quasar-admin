<template>
  <div
    class="login-wrapper"
  >
    <div class="login-box shadow-1">
      <div class="logo q-mb-xl">
        <span class="db">
          <img src="/favicon.ico" alt="logo">
        </span>
        <div class="text-h6 text-grey-8">{{ title }}</div>
      </div>

      <q-form
        ref="form"
        class="q-gutter-md"
        @submit="login"
      >
        <q-input
          v-model="loginData.username"
          label="用户名"
          lazy-rules
          :rules="[ val => !!val || '用户名不能为空' ]"
        />

        <q-input
          v-model="loginData.password"
          label="密码"
          lazy-rules
          :type="isPwd ? 'password' : 'text'"
          hide-bottom-space
          :rules="[ val => !!val || '密码不能为空' ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'mdi-eye' : 'mdi-eye-off'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="links q-mb-xl">
          <router-link
            to="/forget"
          >
            忘记密码？
          </router-link>
        </div>

        <div>
          <q-btn
            label="登录"
            type="submit"
            color="primary"
            size="lg"
            class="full-width"
            unelevated
            :loading="loading"
          />
        </div>

        <div class="text-center text-grey-7">
          还没有账号？
          <router-link
            class="text-primary"
            to="register"
          >
            注册！
          </router-link>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { QForm } from 'quasar'
import md5 from 'blueimp-md5'

import settings from 'src/settings'
import { LoginData } from 'src/api/user'
import { UserModule } from 'store/user'

export default defineComponent({
  name: 'Login',
  setup (_, { root: { $router, $route } }) {
    const form = ref<QForm>(null as unknown as QForm)

    const loginData = reactive<LoginData>({
      username: '',
      password: '',
    })
    const isPwd = ref(true)
    const redirect = $route.query.redirect as string || '/'
    const otherQuery = (() => {
      const query = $route.query as Record<string, string>
      return Object.keys(query).reduce((prev, curr) => {
        if (curr !== 'redirect') {
          prev[curr] = query[curr]
        }
        return prev
      }, {} as Record<string, string>)
    })()
    const loading = ref(false)

    async function login () {
      if (!await form.value.validate()) {
        return
      }
      try {
        loading.value = true
        await UserModule.Login({
          ...loginData,
          password: md5(loginData.password),
        })
        $router.push({
          path: redirect,
          query: otherQuery,
        })
      } catch (error) {
        //
      }
      loading.value = false
    }

    return {
      title: settings.title,
      login,
      loginData,
      form,
      isPwd,
      loading,
    }
  },
})
</script>

<style lang="stylus" scoped>
.login-wrapper
  display flex
  justify-content center
  align-items center
  min-height 100vh
  background url('~assets/images/login-background.jpg')

.login-box
  background #fff
  padding 20px
  max-width 400px
  width 90%
  margin 10% 0

.logo
  text-align center
  .db
    img
      width 40px

.links
  text-align right
  a
    color $grey-7
    &:hover
      color $primary
</style>
