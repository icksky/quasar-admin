<template>
  <q-header
      :class="$q.dark.isActive
        ? 'bg-dark text-white'
        : 'bg-white text-blue-6'"
      elevated
    >
      <q-toolbar>
        <div class="class-toolbar--left">
          <q-btn
            v-if="$q.screen.lt.md && ifShowSidebar"
            flat
            dense
            round
            icon="las la-bars"
            aria-label="Menu"
            @click="showSidebar"
          />
        </div>

        <q-space />

        <div class="q-toolbar--right">
          <q-btn
            :icon="`las la-${$q.dark.isActive ? 'sun' : 'moon'}`"
            flat
            @click="$q.dark.toggle()"
          />

          <navbar-notify
            class="navbar-menu"
            :request="getNavbarNotifies"
          />

          <q-btn-dropdown
            class="navbar-menu"
            flat
            unelevated
          >
            <q-avatar
              slot="label"
              size="40px"
            >
              <img :src="user.avatar">
            </q-avatar>

            <q-list>
              <q-item
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img :src="user.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ user.name }}</q-item-label>
                  <q-item-label caption>{{ user.email }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <div class="text-grey-7">
                <q-item
                  clickable
                  v-ripple
                  @click="logout"
                >
                  <q-item-section avatar>
                    <q-icon name="las la-sign-out-alt" />
                  </q-item-section>

                  <q-item-section>退出登录</q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

import settings from 'src/settings'
import { APPModule } from 'store/app'
import { UserModule } from 'store/user'
import NavbarNotify from './navbar-notify.vue'
import { getNavbarNotifies } from './service'

export default defineComponent({
  name: 'Navbar',
  components: {
    NavbarNotify,
  },
  setup (_, { root: { $router, $q } }) {
    const user = reactive({
      name: UserModule.name,
      email: UserModule.email,
      avatar: UserModule.avatar || 'https://picsum.photos/id/1068/100/100',
    })

    async function logout () {
      await UserModule.LogOut()
      $router.replace('login')
      $q.notify({
        message: '退出成功',
      })
    }

    function showSidebar () {
      APPModule.TOGGLE_SIDEBAR(true)
    }

    return {
      logout,
      user,
      showSidebar,
      ifShowSidebar: settings.showSidebar,
      getNavbarNotifies,
    }
  },
})
</script>

<style lang="stylus" scoped>
.q-header
  .q-toolbar
    height $toolbar-min-height
    &--right
      height 100%
      display flex
      align-items center
    .q-btn
      height 100%
.navbar-menu
  ::v-deep
    .q-btn-dropdown__arrow
      display none
</style>
