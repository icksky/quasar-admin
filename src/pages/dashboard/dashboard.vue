<template>
  <q-page
    class="dashboard-wrapper"
    padding
  >
    <section class="row q-col-gutter-xl q-mb-xl">
      <div
        v-for="info in infoGroup"
        :key="info.name"
        class="col-lg-3 col-sm-6 col-xs-12"
      >
        <q-card
          class="q-pa-lg"
        >
          <q-item>
            <q-item-section>
              <q-item-label class="text-h4">{{ info.number }}</q-item-label>
              <q-item-label class="text-grey">{{ info.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                round
                :color="info.color"
                :icon="`mdi-${info.icon}`"
                unelevated
                size="lg"
                class="cursor-inherit"
              />
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </section>

    <section class="row q-col-gutter-xl q-mb-xl">
      <div class="col-lg-8 col-xs-12">
        <q-card
          class="q-pa-lg"
        >
          <div ref="lineChartEl" class="line-chart" />
        </q-card>
      </div>
      <div class="col-lg-4 col-md-12 col-sm-12">
        <div class="row q-col-gutter-xl">
          <div class="col-lg-12 col-md-6 col-xs-12">
            <q-card
              class="q-pa-lg"
            >
              <q-item>
                <q-item-section avatar>
                  <q-icon
                    name="las la-code-branch"
                    size="xl"
                    color="grey-7"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-h6">Git Commits</q-item-label>
                  <q-item-label caption>Oct 2020</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label
                    class="text-h4 text-weight-light"
                  >
                    <sup>
                      <q-icon
                        name="las la-arrow-up"
                        size="sm"
                      />
                    </sup>
                    36895
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div ref="barChartEl" class="bar-chart" />
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-lg-12 col-md-6 col-xs-12">
            <q-card
              class="q-pa-lg"
            >
              <q-item>
                <q-item-section avatar>
                  <q-icon
                    name="las la-code-branch"
                    size="xl"
                    color="grey-7"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-h6">Bandwidth Usage</q-item-label>
                  <q-item-label caption>Oct 2020</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label
                    class="text-h4 text-weight-light"
                  >
                    120 GB
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div ref="pieChartEl" class="pie-chart" />
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <section>
      <q-card class="q-pa-lg">
        <q-card-section>
          <q-item class="no-padding">
            <q-item-section>
              <q-item-label class="text-h6">Project of the Month</q-item-label>
              <q-item-label caption>Overview of Last Month</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-table
          :data="projectData"
          :columns="projectColumns"
          row-key="name"
          hide-bottom
        >
          <template v-slot:body-cell-leader="props">
            <q-td :props="props">
              <q-item class="no-padding">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="props.row.leader.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-h6">{{ props.row.leader.name }}</q-item-label>
                  <q-item-label caption>{{ props.row.leader.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
          <template v-slot:body-cell-team="props">
            <q-td :props="props">
              <q-avatar
                v-for="src in props.row.team"
                :key="src"
                size="lg"
                style="margin-right: -10px;"
                class="shadow-2"
              >
                <img :src="src">
              </q-avatar>
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <div
                style="width: 14px; height: 14px; border-radius: 50%"
                :class="`bg-${props.row.status}`"
              />
            </q-td>
          </template>
        </q-table>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { QTable, colors } from 'quasar'

import useEcharts from 'hooks/use-echarts'
import { colorScheme } from 'boot/echarts-themes'
import { ProjectData, getProductList } from './service'

export default defineComponent({
  name: 'Dashboard',
  setup () {
    const infoGroup = [
      {
        number: 250,
        name: 'Issues',
        icon: 'receipt',
        color: 'red-6',
      },
      {
        number: 520,
        name: 'Messages',
        icon: 'message-bulleted',
        color: 'green-4',
      },
      {
        number: 262,
        name: 'Tasks',
        icon: 'calendar-check',
        color: 'amber-4',
      },
      {
        number: 32,
        name: 'Porject',
        icon: 'console',
        color: 'blue-4',
      },
    ]

    const lineChartEl = ref(null as unknown as HTMLDivElement)
    const barChartEl = ref(null as unknown as HTMLDivElement)
    const pieChartEl = ref(null as unknown as HTMLDivElement)

    const { setOption: setOptionOfLineChart } = useEcharts(lineChartEl)
    const { setOption: setOptionOfBarChart } = useEcharts(barChartEl)
    const { setOption: setOptionOfPieChart } = useEcharts(pieChartEl)

    const projectColumns: QTable['columns'] = [
      {
        name: 'leader',
        label: 'Team Leader',
        field: 'leader',
        align: 'left',
      },
      {
        name: 'project',
        label: 'Project',
        field: 'project',
        align: 'left',
      },
      {
        name: 'team',
        label: 'Team',
        field: 'team',
        align: 'left',
      },
      {
        name: 'status',
        label: 'Status',
        field: 'status',
        align: 'left',
      },
      {
        name: 'weeks',
        label: 'Weeks',
        field: 'weeks',
        align: 'left',
      },
      {
        name: 'budget',
        label: 'Budget',
        field: 'budget',
        align: 'left',
      },
    ]

    const projectData = ref<ProjectData[]>([])

    async function getProducts () {
      const { data } = await getProductList()
      projectData.value = data
    }
    getProducts()

    onMounted(() => {
      setOptionOfLineChart({
        title: {
          text: 'Week Issues',
          subtext: 'Overview of latest Week',
          left: '2%',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Solved', 'Issues'],
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '2%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'Solved',
            type: 'line',
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: colors.changeAlpha(colorScheme[0], 1),
                  },
                  {
                    offset: 1,
                    color: colors.changeAlpha(colorScheme[0], 0.2),
                  },
                ],
              } as unknown as string,
            },
            data: [120, 132, 101, 134, 90, 0, 0],
          },
          {
            name: 'Issues',
            type: 'line',
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: colors.changeAlpha(colorScheme[1], 1),
                  },
                  {
                    offset: 1,
                    color: colors.changeAlpha(colorScheme[0], 0.2),
                  },
                ],
              } as unknown as string,
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      })

      setOptionOfBarChart({
        grid: {
          left: 0,
          bottom: 0,
          top: 0,
          right: 0,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: Array(16).fill('1').map((_, index) => `2020-10-${`0${index + 1}`.slice(-2)}`),
          show: false,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 1, 30, 50, 80, 22, 190, 38, 5, 92],
            type: 'bar',
            itemStyle: {
              color: '#A880FA',
            },
            barWidth: 3,
          },
        ],
      })

      setOptionOfPieChart({
        grid: {
          left: 0,
          bottom: 0,
          top: 0,
          right: 0,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}({d}%)',
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false,
            },
            data: [
              { value: 10, name: 'Documents' },
              { value: 40, name: 'Programs' },
              { value: 55, name: 'Images' },
              { value: 20, name: 'Code' },
            ],
          },
        ],
      })
    })

    return {
      infoGroup,
      lineChartEl,
      barChartEl,
      pieChartEl,
      projectColumns,
      projectData,
    }
  },
})
</script>

<style lang="stylus" scoped>
.line-chart
  height 445px
.bar-chart
  height 120px
  width 140px
.pie-chart
  height 120px
  width 140px
</style>
