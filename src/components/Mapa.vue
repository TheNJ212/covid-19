<template>
  <div class="mapa">
    <vs-row vs-justify="center">
  <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8" vs-xs="12" vs-sm="10" style="padding:0 8px">
    <vs-card>
    <div id="main"  style="width: 100%; height: 650px; margin: 0 auto; background-color: #FFF; padding:0 8px "></div>
    </vs-card>
        </vs-col>
</vs-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// var $ = require('jquery')
const ECharts = require('echarts/dist/echarts-en.min.js')
const axios = require('axios')

export default {
  name: 'Mapa',
  components: {
  },
  computed: {
    countriesData: function () {
      const podaci = this.$parent.statsPerCountry
      return podaci
    }
  },
  mounted () {
    var myChart = ECharts.init(document.getElementById('main'))
    var myGeoJSONPath = 'custom.geo.json'
    myChart.showLoading()
    axios.get(myGeoJSONPath).then(world => {
      myChart.hideLoading()

      ECharts.registerMap('World', world.data)
      const option = {
        title: {
          text: 'World Outbrake Covid-19',
          subtext: 'Data from disease.sh',
          // sublink: '/#/countries',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            var value = (params.value + '').split('.')
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            return params.name + '<br/>' + 'Cases' + ': ' + value
          }
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: 10000000,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          text: ['High', 'Low'],
          calculable: true
        },
        toolbox: {
          show: true,
          // orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
            // dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'Count',
            type: 'map',
            roam: true,
            map: 'World',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { name: 'Serbia', value: 4822023 }
            ]
          }
        ]
      }

      myChart.setOption(option)
      window.onresize = function () {
        myChart.resize()
      }
      // var vm = this
      // myChart.on('click', function (params) {
      //   alert(params.name.toLowerCase())
      //   vm.$router.push('/countries/' + params.name)
      // })

      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    })
  }
}
</script>
