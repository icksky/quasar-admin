<template>
  <a
    v-if="isExternal(to)"
    :href="to"
    :target="target || '_blank'"
    rel="noopener"
  >
    <q-item
      clickable
      :inset-level="isSub ? 0.4 : 0"
      exact
    >
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
      </q-item-section>
    </q-item>
  </a>
  <q-item
    v-else
    clickable
    :to="to"
    :target="target"
    :inset-level="isSub ? 0.4 : 0"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { isExternal } from 'src/utils/validate'

export default defineComponent({
  name: 'MenuItemLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: String,
    target: String,
    isSub: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    return {
      isExternal,
    }
  },
})
</script>
