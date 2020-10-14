<template>
  <div
    class="error-page-wrapper q-py-xl"
  >
    <section class="text-center q-mt-xl">
      <h1 class="no-margin">{{ code }}</h1>
      <h4 class="q-my-xl text-weight-light">{{ title }}</h4>
      <h6 class="no-margin text-weight-thin text-uppercase">{{ message }}</h6>
      <q-btn
        v-if="showButton"
        class="q-mt-xl"
        to="/"
        icon="las la-home"
        label="返回首页"
        color="blue-6"
        :flat="$q.dark.isActive"
      />
    </section>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

interface ErrorPageProps {
  code: string | number
  title?: string
  message?: string
  showButton?: boolean
}

export default defineComponent<ErrorPageProps>({
  name: 'ErrorPage',
  props: {
    code: {
      type: String || Number,
      default: 'ERROR',
    },
    title: String,
    message: String,
    showButton: {
      type: Boolean,
      default: true,
    },
  },
  setup () {
    return {}
  },
})
</script>

<style lang="stylus" scoped>
.error-page-wrapper
  position relative
  height 100%
  color $grey-8

h1
  font-size 210px
  font-weight 900
  text-shadow 4px 4px 0 #fff, 6px 6px 0 $grey-9
  line-height 210px

.body--dark
  .error-page-wrapper
    color $blue-grey-5
  h1
    text-shadow none
</style>
