/* eslint-disable no-unused-expressions */
import { ref, Ref, toRef, unref, watch } from '@vue/composition-api'
import echarts, { EChartOption, EChartsResponsiveOption, ECharts } from 'echarts'
import { debounce, Dark } from 'quasar'

import { useOnUnmounted } from 'hooks/core/vue-helper'

export default function useEcharts (
  elRef: Ref<HTMLDivElement>,
  theme?: string,
) {
  const chartInstacnceRef = ref<ECharts | null>(null)
  const resizeHandler = debounce(resize, 200)
  let optionTemp!: EChartOption | EChartsResponsiveOption

  function init () {
    chartInstacnceRef.value = echarts.init(elRef.value, theme || Dark.isActive ? 'material-dark' : 'material-light')
    window.addEventListener('resize', resizeHandler)
  }

  function setOption (option: EChartOption | EChartsResponsiveOption, clear = true) {
    let chartInstance = unref(chartInstacnceRef)
    if (!chartInstance) {
      init()
      chartInstance = unref(chartInstacnceRef)
    }
    optionTemp = option
    clear && chartInstance?.clear()
    chartInstance?.setOption(option)
  }

  function resize () {
    const chartInstance = unref(chartInstacnceRef)
    if (!chartInstance) return

    chartInstance.resize()
  }

  function clear () {
    window.removeEventListener('resize', resizeHandler)

    const chartInstance = unref(chartInstacnceRef)
    chartInstance?.dispose()
    chartInstacnceRef.value = null
  }

  useOnUnmounted(clear)

  watch(toRef(Dark, 'isActive'), () => {
    clear()
    setOption(optionTemp)
  })

  return {
    setOption,
  }
}
