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
            v-if="$q.screen.lt.md"
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

          <q-btn-dropdown
            class="navbar-menu"
            flat
            unelevated
          >
            <q-icon
              slot="label"
              name="las la-bell"
            >
              <q-badge
                color="red"
                floating
                label="4"
              />
            </q-icon>

            <q-list
              style="max-width: 300px"
              separator
            >
              <q-item
                clickable
                v-ripple
              >
                <q-item-section top avatar>
                  <q-avatar
                    color="red-6"
                    text-color="white"
                    icon="las la-envelope"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label>你收到了 1 封邮件</q-item-label>
                  <q-item-label caption>3小时前</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
              >
                <q-item-section top avatar>
                  <q-avatar
                    color="green-6"
                    text-color="white"
                    icon="las la-calendar"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label>你有一个会议需要确认</q-item-label>
                  <q-item-label caption>10小时前</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
              >
                <q-item-section top avatar>
                  <q-avatar
                    color="blue-6"
                    text-color="white"
                    icon="las la-project-diagram"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label>贪狼 给你指派了一个任务</q-item-label>
                  <q-item-label caption>9/26 10:25</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
              >
                <q-item-section top avatar>
                  <q-avatar
                    color="red-6"
                    text-color="white"
                    icon="las la-bug"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label>贪狼 给你抛来了一个 BUG</q-item-label>
                  <q-item-label caption>9/26 10:25</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                class="text-center text-grey-7"
              >
                <q-item-section>
                  <q-item-label>查看全部消息</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

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
import { APPModule } from 'store/app'
import { UserModule } from 'store/user'

export default defineComponent({
  name: 'Navbar',
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
