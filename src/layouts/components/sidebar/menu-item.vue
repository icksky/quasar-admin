<template>
  <div
    v-if="!route.meta || !route.meta.hidden"
    class="menu-item-wrapper"
  >
    <template
      v-if="theOnlyOneChild && !theOnlyOneChild.children"
    >
      <menu-item-link
        class="menu-item"
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
        :target="theOnlyOneChild.meta.target"
        :icon="theOnlyOneChild.meta.icon"
        :label="theOnlyOneChild.meta.title"
        :is-sub="isSub"
      />
    </template>
    <q-expansion-item
      v-else
      :value="opened"
      :icon="route.meta.icon"
      :label="route.meta.title"
      expand-icon="las la-angle-down"
      dense-toggle
      :to="isExpansionRoutable ? route.path : ''"
    >
      <template v-if="route.children">
        <menu-item
          v-for="child in route.children"
          :key="child.path"
          :route="child"
          :base-path="resolvePath(child.path)"
          is-sub
        />
      </template>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { RouteConfig } from 'vue-router'
import path from 'path'

import { isExternal } from 'src/utils/validate'
import { APPModule } from 'store/app'
import MenuItemLink from './menu-item-link.vue'

interface MenuItemProps {
  route: RouteConfig
  basePath: string
}

export default defineComponent({
  name: 'MenuItem',
  components: {
    MenuItemLink,
  },
  props: {
    route: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
    isSub: {
      type: Boolean,
      default: false,
    },
  },
  setup ({
    route,
    basePath,
  }: MenuItemProps) {
    const showingChildNumber = computed(() => {
      if (route.children) {
        const showingChildren = route.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (route.children) {
        for (const child of route.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...route, path: '' }
    })

    // If there has children and no redirect,
    // regarded as non-routable
    const isExpansionRoutable = computed(() => {
      return route?.children?.length && route.redirect
    })

    function resolvePath (routePath: string) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath)) {
        return basePath
      }
      return path.resolve(basePath, routePath)
    }

    let menuInited = false
    const opened = computed(() => {
      // To prevent the current menu closed automatically when switching menu
      if (menuInited) return true
      if (route.path === '*') return false
      menuInited = route.path === '/'
        ? APPModule.activeMenu === route.path
        : Boolean(new RegExp(`^${route.path}`).exec(APPModule.activeMenu))
      return menuInited
    })

    return {
      theOnlyOneChild,
      resolvePath,
      isExternal,
      opened,
      isExpansionRoutable,
    }
  },
})
</script>

<style lang="stylus" scoped>
$menu-padding = 16px 20px 16px 30px
$brand-color = $blue-6

.menu-item
.q-expansion-item
  color $grey-7
  transition color .1s

.q-item
  padding $menu-padding !important
  &::before
    transition height .3s ease-in-out
    content ' '
    width 3px
    height 0
    display inline-block
    background $brand-color
    position absolute
    top 0
    right 0

  &.q-router-link--active
  &--active
    color $brand-color
    &::before
      height 100%

::v-deep
  .q-expansion-item
    &__content
      padding-left 26px
      .q-item
        &::before
          content none
        .q-focus-helper
          display none
    &__toggle-icon
      font-size 18px
    &__container
      > .q-router-link--active
        background $blue-1
        &::before
          height 100%
        .q-focus-helper
          visibility hidden
        .q-expansion-item__toggle-icon
          color $brand-color
  .q-item
    &:hover
      color $brand-color
      .q-expansion-item__toggle-icon
        color $brand-color
  .q-item
    padding $menu-padding !important
    &__section--avatar
      min-width auto
      padding-right $space-base
    &::before
      @extends .q-item::before
    &.q-router-link--active
    &--active
      .q-focus-helper
        background currentColor
        opacity .15

.body--dark
  $brand-color = $blue-3

  .menu-item
  .q-expansion-item
    &:hover
      color $brand-color
    &::v-deep
      .q-expansion-item
        &__container
          > .q-router-link--active
            .q-expansion-item__toggle-icon
              color $brand-color
      .q-item
        color $grey-4
        &::before
          background $brand-color
        &:hover
          color $brand-color
          .q-expansion-item__toggle-icon
            color $brand-color

  .q-item
    &::before
      background $brand-color
    &.q-router-link--active
    &--active
      color $brand-color
</style>
