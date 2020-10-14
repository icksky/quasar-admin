<template>
  <error-page
    code="401"
    title="Unauthorized!"
    message="你无权访问该页面"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import ErrorPage from './error-page.vue'

export default defineComponent({
  name: 'Error500',
  components: { ErrorPage },
})
</script>
