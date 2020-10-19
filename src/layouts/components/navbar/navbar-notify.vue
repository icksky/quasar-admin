<template>
  <q-btn-dropdown
    flat
    unelevated
  >
    <q-icon
      slot="label"
      :name="icon || 'las la-bell'"
    >
      <q-badge
        v-show="unread"
        color="red"
        floating
        :label="unread"
      />
    </q-icon>

    <q-list
      style="max-width: 300px"
      separator
    >
      <q-item
        v-for="notify in list"
        :key="notify.id"
        clickable
        v-ripple
      >
        <q-item-section top avatar>
          <q-avatar
            :color="notify.color"
            text-color="white"
            :icon="notify.icon"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ notify.title }}</q-item-label>
          <q-item-label caption>{{ notify.date }}</q-item-label>
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
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import { NavbarNotifiesItem, NavbarNotifiesData } from './data'

interface NavbarNotifyProps {
  icon: string
  request: () => Promise<ResponseData<NavbarNotifiesData>>
}

type NotifyTypes = {
  [key in NavbarNotifiesItem['type']]: {
    color: 'red-6' | 'blue-6' | 'green-6'
    icon: string
  }
}

export default defineComponent<NavbarNotifyProps>({
  name: 'NavbarNotify',
  props: {
    icon: String,
    request: {
      required: true,
      type: Function,
    },
  },
  setup ({
    request,
  }) {
    const unread = ref(0)
    const list = ref<NavbarNotifiesItem[]>([])
    const notifyTypes: NotifyTypes = {
      email: { color: 'red-6', icon: 'las la-envelope' },
      task: { color: 'green-6', icon: 'las la-calendar' },
      issue: { color: 'red-6', icon: 'las la-bug' },
      calendar: { color: 'blue-6', icon: 'las la-project-diagram' },
    }

    async function getData () {
      const { data } = await request()
      list.value = data.list.map(item => ({
        ...item,
        ...notifyTypes[item.type],
      }))
      unread.value = data.unread
    }
    getData()

    return {
      unread,
      list,
    }
  },
})
</script>

<style lang="stylus" scoped>
</style>
