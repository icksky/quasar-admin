<template>
  <error-page
    code="500"
    title="Internal Server Error!"
    message="请稍后再试"
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
