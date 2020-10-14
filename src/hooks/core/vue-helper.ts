import { getCurrentInstance, onUnmounted } from '@vue/composition-api'

export function useOnUnmounted (fn: () => void | Promise<void>) {
  if (getCurrentInstance()) {
    onUnmounted(fn)
  }
}
