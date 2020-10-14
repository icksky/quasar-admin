<template>
  <error-page
    code="404"
    title="Page Not Found!"
    message="你访问的页面不存在"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import ErrorPage from './error-page.vue'

export default defineComponent({
  name: 'Error404',
  components: { ErrorPage },
})
</script>
