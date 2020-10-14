<template>
  <q-layout view="lHh Lpr lFf">
    <navbar />

    <sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Navbar from './components/navbar/index.vue'
import Sidebar from './components/sidebar/index.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    Navbar,
    Sidebar,
  },
})
</script>

<style lang="stylus" scoped>
</style>
