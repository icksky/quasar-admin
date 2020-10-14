<template>
  <q-drawer
    v-model="drawerVisible"
    :mini="drawerMini"
    :mini-to-overlay="drawerOverlay"
    show-if-above
    elevated
    persistent
    :width="sidebarWidth"
    @mouseenter="drawerMini = false"
    @mouseleave="handleMouseLeave"
    @hide="handleHide"
  >
    <div class="layout-logo">
      <router-link
        class="main"
        to="/"
      >
        <img
          class="logo q-mr-sm"
          src="/favicon.ico"
          alt="Logo"
        >
        <span class="title">{{ title }}</span>
      </router-link>
      <q-btn
        v-if="$q.screen.gt.sm"
        flat
        dense
        round
        :icon="`las la-${drawerOpened ? 'bars' : 'times'}`"
        aria-label="Menu"
        class="switcher"
        @click="drawerOpened = !drawerOpened"
      />
    </div>
    <q-list>
      <menu-item
        v-for="route in routes"
        :key="route.path"
        :route="route"
        :base-path="route.path"
      />
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'

import { SIDEBAR_WIDTH } from 'const/layout'
import Settings from 'src/settings'
import { APPModule } from 'store/app'
import { PermissionModule } from 'store/permission'
import MenuItem from './menu-item.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    MenuItem,
  },
  setup () {
    const drawerVisible = computed({
      get: () => APPModule.sidebar,
      set: (val) => APPModule.TOGGLE_SIDEBAR(val),
    })
    const drawerOpened = ref(true)
    const drawerOverlay = ref(false)
    const drawerMini = ref(false)
    const routes = computed(() => PermissionModule.routes)

    function handleMouseLeave () {
      !drawerOpened.value && (drawerMini.value = true)
    }

    watch([drawerOpened, drawerMini], (_, [opened, mini]) => {
      drawerOverlay.value = !opened && mini
    })

    function handleHide () {
      APPModule.TOGGLE_SIDEBAR(false)
    }

    return {
      drawerVisible,
      drawerOpened,
      drawerOverlay,
      drawerMini,
      sidebarWidth: SIDEBAR_WIDTH,
      title: Settings.title,
      routes,
      handleMouseLeave,
      handleHide,
    }
  },
})
</script>

<style lang="stylus" scoped>
.layout-logo
  height $toolbar-min-height
  display flex
  align-items center
  justify-content space-between
  padding 6px 12px
  color $blue-6
  .main
    display flex
    align-items center
    height 100%
    text-decoration none
    color $color-base
  .logo
    height 100%
  .title
    font-size 20px
.q-drawer--mini
  .layout-logo
    padding 6px 0
    justify-content center
    .title
    .switcher
      display none
    .logo
      margin-right 0
::v-deep
  .q-drawer--mini
    .q-item
      padding 0 !important
  .q-drawer--dark
    background darken($dark, 28%)
.body--dark
  .layout-logo
    .main
    .switcher
      color #ffffff
</style>
