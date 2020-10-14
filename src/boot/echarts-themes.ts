/* eslint-disable @typescript-eslint/ban-types */
import { boot } from 'quasar/wrappers'
import echarts from 'echarts'

interface EchartsThemes {
  material: object
}

const light = {
  lineStyleColor: '#e6e6e6',
  axisLabelColor: '#9098ac',
  titleColor: '#616161',
}

const dark = {
  lineStyleColor: '#2C3543',
  axisLabelColor: '#A6ADAA',
  titleColor: '#ffffff',
}

export const colorScheme: string[] = [
  '#2962ff',
  '#00bcd4',
  '#4caf50',
  '#a77ff9',
  '#2196f3',
  '#f44336',
]

export default boot(() => {
  const log = function (msg: string) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg)
    }
  }
  if (!echarts) {
    log('ECharts is not Loaded')
    return
  }

  const getThemes = (isDark = false): EchartsThemes => {
    const colorMode = isDark ? dark : light

    return {
      material: {
        color: colorScheme,
        backgroundColor: 'rgba(252,252,252,0)',
        textStyle: {},
        title: {
          textStyle: {
            color: colorMode.titleColor,
          },
          subtextStyle: {
            color: '#9E9E9E',
          },
        },
        line: {
          itemStyle: {
            normal: {
              borderWidth: '1',
            },
          },
          lineStyle: {
            normal: {
              width: '1',
            },
          },
          symbolSize: '4',
          symbol: 'emptyCircle',
          smooth: true,
        },
        radar: {
          itemStyle: {
            normal: {
              borderWidth: '1',
            },
          },
          lineStyle: {
            normal: {
              width: '1',
            },
          },
          symbolSize: '4',
          symbol: 'emptyCircle',
          smooth: true,
        },
        bar: {
          itemStyle: {
            normal: {
              barBorderWidth: '1',
              barBorderColor: '#cacdd9',
            },
            emphasis: {
              barBorderWidth: '1',
              barBorderColor: '#cacdd9',
            },
          },
        },
        pie: {
          itemStyle: {
            normal: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
            emphasis: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
          },
        },
        scatter: {
          itemStyle: {
            normal: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
            emphasis: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
          },
        },
        boxplot: {
          itemStyle: {
            normal: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
            emphasis: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
          },
        },
        parallel: {
          itemStyle: {
            normal: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
            emphasis: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
          },
        },
        sankey: {
          itemStyle: {
            normal: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
            emphasis: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
          },
        },
        funnel: {
          itemStyle: {
            normal: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
            emphasis: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
          },
        },
        gauge: {
          itemStyle: {
            normal: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
            emphasis: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
          },
        },
        candlestick: {
          itemStyle: {
            normal: {
              color: '#e6a0d2',
              color0: 'transparent',
              borderColor: '#e6a0d2',
              borderColor0: '#3fb1e3',
              borderWidth: '2',
            },
          },
        },
        graph: {
          itemStyle: {
            normal: {
              borderWidth: '1',
              borderColor: '#cacdd9',
            },
          },
          lineStyle: {
            normal: {
              width: '1',
              color: '#cccccc',
            },
          },
          symbolSize: '4',
          symbol: 'emptyCircle',
          smooth: true,
          color: colorScheme,
          label: {
            normal: {
              textStyle: {
                color: '#ffffff',
              },
            },
          },
        },
        map: {
          itemStyle: {
            normal: {
              areaColor: '#eeeeee',
              borderColor: '#aaaaaa',
              borderWidth: 0.5,
            },
            emphasis: {
              areaColor: 'rgba(63,177,227,0.25)',
              borderColor: '#3fb1e3',
              borderWidth: 1,
            },
          },
          label: {
            normal: {
              textStyle: {
                color: '#ffffff',
              },
            },
            emphasis: {
              textStyle: {
                color: '#3fb1e3',
              },
            },
          },
        },
        geo: {
          itemStyle: {
            normal: {
              areaColor: '#eeeeee',
              borderColor: '#aaaaaa',
              borderWidth: 0.5,
            },
            emphasis: {
              areaColor: 'rgba(63,177,227,0.25)',
              borderColor: '#3fb1e3',
              borderWidth: 1,
            },
          },
          label: {
            normal: {
              textStyle: {
                color: '#ffffff',
              },
            },
            emphasis: {
              textStyle: {
                color: '#3fb1e3',
              },
            },
          },
        },
        categoryAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: colorMode.lineStyleColor,
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#333',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: colorMode.axisLabelColor,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: [
                colorMode.lineStyleColor,
              ],
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.05)',
                'rgba(200,200,200,0.02)',
              ],
            },
          },
        },
        valueAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: colorMode.lineStyleColor,
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#333',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: colorMode.axisLabelColor,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: [
                colorMode.lineStyleColor,
              ],
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.05)',
                'rgba(200,200,200,0.02)',
              ],
            },
          },
        },
        logAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: colorMode.lineStyleColor,
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#333',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: colorMode.axisLabelColor,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: [
                colorMode.lineStyleColor,
              ],
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.05)',
                'rgba(200,200,200,0.02)',
              ],
            },
          },
        },
        timeAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: colorMode.lineStyleColor,
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#333',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: colorMode.axisLabelColor,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: [
                colorMode.lineStyleColor,
              ],
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.05)',
                'rgba(200,200,200,0.02)',
              ],
            },
          },
        },
        toolbox: {
          iconStyle: {
            normal: {
              borderColor: '#999999',
            },
            emphasis: {
              borderColor: '#666666',
            },
          },
        },
        legend: {
          textStyle: {
            color: '#999999',
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              color: '#cccccc',
              width: 0.5,
            },
            crossStyle: {
              color: '#cccccc',
              width: 0.5,
            },
          },
        },
        timeline: {
          lineStyle: {
            color: '#626c91',
            width: 1,
          },
          itemStyle: {
            normal: {
              color: '#626c91',
              borderWidth: 1,
            },
            emphasis: {
              color: '#626c91',
            },
          },
          controlStyle: {
            normal: {
              color: '#626c91',
              borderColor: '#626c91',
              borderWidth: 0.5,
            },
            emphasis: {
              color: '#626c91',
              borderColor: '#626c91',
              borderWidth: 0.5,
            },
          },
          checkpointStyle: {
            color: '#3fb1e3',
            borderColor: 'rgba(63,177,227,0.15)',
          },
          label: {
            normal: {
              textStyle: {
                color: '#626c91',
              },
            },
            emphasis: {
              textStyle: {
                color: '#626c91',
              },
            },
          },
        },
        visualMap: {
          color: [
            '#2a99c9',
            '#afe8ff',
          ],
        },
        dataZoom: {
          backgroundColor: 'rgba(255,255,255,0)',
          dataBackgroundColor: 'rgba(222,222,222,1)',
          fillerColor: 'rgba(114,230,212,0.25)',
          handleColor: '#cccccc',
          handleSize: '100%',
          textStyle: {
            color: '#999999',
          },
        },
        markPoint: {
          label: {
            normal: {
              textStyle: {
                color: '#ffffff',
              },
            },
            emphasis: {
              textStyle: {
                color: '#ffffff',
              },
            },
          },
        },
      },
    }
  }

  const lightThemes = getThemes()
  const darkThemes = getThemes(true)

  for (const name in lightThemes) {
    if (Object.prototype.hasOwnProperty.call(lightThemes, name)) {
      echarts.registerTheme(`${name}-light`, lightThemes[name as keyof EchartsThemes])
      echarts.registerTheme(`${name}-dark`, darkThemes[name as keyof EchartsThemes])
    }
  }
})
