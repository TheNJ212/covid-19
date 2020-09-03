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
const ECharts = require('echarts/dist/echarts-en.min.js')
const axios = require('axios')

export default {
  name: 'Mapa',
  components: {
  },
  data: function () {
    return {
      mapData: {},
      countriesData: {}
    }
  },
  computed: {
  },
  created: function () {
    axios.get('https://disease.sh/v3/covid-19/countries').then(resp => {
      this.countriesData = resp.data
    })
  },
  watch: {
    countriesData: function (val, oldval) {
      if (val !== oldval) {
        var arr = [...this.countriesData]
        var arr2 = arr.map(x => ({ name: x.country, value: x.cases }))
        this.mapData = arr2
      }
    },
    mapData: function (val, oldval) {
      if (val !== oldval) {
        this.prikaziMapu()
      }
    }
  },
  mounted () {

  },
  methods: {
    prikaziMapu: function () {
      var myGeoJSONPath = 'custom.geo.json'
      var vm = this
      var myChart = ECharts.init(document.getElementById('main'))
      myChart.showLoading()
      axios.get(myGeoJSONPath).then(world => {
        myChart.hideLoading()
        ECharts.registerMap('World', world.data)
        var option = {
          title: {
            text: 'World Outbrake Covid-19',
            subtext: 'Data from disease.sh',
            // sublink: '/countries',
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
            max: 700000,
            inRange: {
              color: ['#ffffbf', '#f6e5b0', '#eac49c', '#dda086', '#d28174', '#cb6f69', '#c55d5e', '#c04e55', '#ba3f4c', '#b42d41', '#af1e38', '#aa0f2f', '#a50026']// ['#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'], ['#ffffff', '#cd727e', '#b14149', '#ab323b', '#a21c26', '#9b0b16']
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
              data: vm.mapData
            }
          ]
        }

        myChart.setOption(option)
        window.onresize = function () {
          myChart.resize()
        }
        myChart.on('click', function (params) {
          vm.$router.push('/countries/' + params.name)
        })

        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
        }
      })
    }
  }
}

</script>
