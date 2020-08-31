<template>
  <div class="grafikglobal">
    <vs-row vs-justify="center">
  <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8" vs-xs="12" vs-sm="10" style="padding:0 8px">
    <vs-card>
    <div id="graph"  style="width: 100%; height: 500px; margin: 0 auto; background-color: #FFF; padding:0 8px ">
        <div ref="chartdiv" style="width: 100%; height:100%"></div>
    </div>
    </vs-card>
        </vs-col>
</vs-row>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import axios from 'axios'
am4core.useTheme(am4themesAnimated)

export default {
  name: 'GrafikGlobal',
  data: function () {
    return {
      worldStatsDaily: {}
    }
  },
  created: function () {
    axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(resp => {
      this.worldStatsDaily = resp.data
    })
  },
  methods: {
    crtajGrafik: function () {
      var vm = this
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)

      chart.colors.step = 4
      chart.legend = new am4charts.Legend()
      chart.cursor = new am4charts.XYCursor()

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.minGridDistance = 50
      dateAxis.renderer.line.strokeOpacity = 0.5
      dateAxis.renderer.line.strokeWidth = 2

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.line.strokeOpacity = 0.5
      valueAxis.renderer.line.strokeWidth = 2

      chart.data = generateChartData(vm.worldStatsDaily)
      createAxisAndSeries('cases', 'Cases', false, 'circle')
      createAxisAndSeries('recovered', 'Recovered', true, 'circle')
      createAxisAndSeries('deaths', 'Deaths', true, 'circle')

      function createAxisAndSeries (field, name, opposite, bullet) {
        var series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.valueY = field
        series.dataFields.dateX = 'date'
        series.strokeWidth = 5
        series.yAxis = valueAxis
        series.name = name
        series.tooltipText = '{name}: [bold]{valueY}[/]'
        series.tensionX = 1
        series.showOnInit = true

        var interfaceColors = new am4core.InterfaceColorSet()

        switch (bullet) {
          case 'triangle':
            bullet = series.bullets.push(new am4charts.Bullet())
            bullet.width = 12
            bullet.height = 12
            bullet.horizontalCenter = 'middle'
            bullet.verticalCenter = 'middle'

            var triangle = bullet.createChild(am4core.Triangle)
            triangle.stroke = interfaceColors.getFor('background')
            triangle.strokeWidth = 2
            triangle.direction = 'top'
            triangle.width = 10
            triangle.height = 10
            break
          case 'rectangle':
            bullet = series.bullets.push(new am4charts.Bullet())
            bullet.width = 10
            bullet.height = 10
            bullet.horizontalCenter = 'middle'
            bullet.verticalCenter = 'middle'

            var rectangle = bullet.createChild(am4core.Rectangle)
            rectangle.stroke = interfaceColors.getFor('background')
            rectangle.strokeWidth = 2
            rectangle.width = 10
            rectangle.height = 10
            break
          default:
            break
        }
      }

      function generateChartData (data) {
        var keys = Object.keys(data)
        var chartData = []
        var dates = Object.keys(data[keys[0]])
        for (var index = 0; index < dates.length; index++) {
          chartData.push({
            date: dates[index],
            cases: (data[keys[0]])[dates[index]],
            recovered: (data[keys[2]])[dates[index]],
            deaths: (data[keys[1]])[dates[index]]
          })
        }
        return chartData
      }
    }
  },

  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  watch: {
    worldStatsDaily: function (val, oldval) {
      if (val !== oldval) {
        this.crtajGrafik()
      }
    }
  }
}
</script>

<style>

g[aria-labelledby="id-66-title"]{
  display:none;
}
</style>
