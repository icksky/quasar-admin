<template>
  <q-layout view="lHh Lpr lFf">
    <navbar
      v-if="showSidebar"
    />

    <sidebar
      v-if="showNavbar"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import settings from 'src/settings'
import Navbar from './components/navbar/index.vue'
import Sidebar from './components/sidebar/index.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    Navbar,
    Sidebar,
  },
  setup () {
    return {
      showSidebar: settings.showSidebar,
      showNavbar: settings.showNavbar,
    }
  },
})
</script>

<style lang="stylus" scoped>
</style>
