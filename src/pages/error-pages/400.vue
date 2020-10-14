<template>
  <error-page
    code="400"
    title="Bad Request!"
    message="请检查你访问的 URL"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import ErrorPage from './error-page.vue'

export default defineComponent({
  name: 'Error400',
  components: { ErrorPage },
})
</script>
