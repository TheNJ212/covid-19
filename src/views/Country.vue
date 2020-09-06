<template>
<div class="country">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
         <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
          <div style="display: flex; align-items: left;" class="pb-5">
            <h1 style="display: inline-block;" class="pr-5">{{stats.country}}</h1>
              <img :src="flag" style="display: inline-block; " class="px-2" >
          </div>
            </vs-col>
    </vs-row>

    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3"  style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h3>Total Cases</h3>
              </div>
              <div>
                <h2 style="color:#5b3cc4">{{stats.cases | zarezi}}</h2>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3" style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h3>Active Cases</h3>
              </div>
              <div>
                <h2 style="color:rgb(255, 130, 0);">{{stats.active | zarezi}}</h2><h6> / {{activePerc}}%</h6>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3" style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h3>Total Deaths</h3>
              </div>
              <div>
                <h2 style="color:rgb(242, 19, 93)">{{stats.deaths | zarezi}}</h2><h6> / {{deathsPerc}}%</h6>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3" style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h3>Total Recovered</h3>
              </div>
              <div>
                <h2 style="color:rgb(23, 201, 100)">{{stats.recovered | zarezi}}</h2><h6> / {{recoveredPerc}}%</h6>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center" style="my-3">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6"  style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h4>Today's New Confirmed Cases</h4>
              </div>
              <div>
                <h2 style="color:#5b3cc4">{{stats.todayCases | zarezi}}   </h2>
                <h6 class="dangerLight"><b-icon-arrow-up font-scale='1.8'></b-icon-arrow-up>{{todayActivePerc}}%</h6>
                <p class="text-muted mt-2">Number of new cases / Ratio between new cases and total number of cases</p>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h3>Today's Death Toll</h3>
              </div>
              <div>
                <h2 style="color:rgb(242, 19, 93)">{{stats.todayDeaths | zarezi}}   </h2>
                <h6 class="dangerLight"><b-icon-arrow-up font-scale='1.8'></b-icon-arrow-up>{{todayDeathsPerc}}%</h6>
                <p class="text-muted mt-2">Number of new deaths / Ratio between new deaths and total number of deaths</p>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <Grafik :podaci='stats.country' v-if="statsPerDay.timeline"></Grafik>
    <vs-row vs-justify="center" class="mb-5">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="6"  style="padding:0 8px" vs-sm="12">
            <vs-card>
           <highcharts :options="chartOptions1" :updateArgs="updateArgs"></highcharts>
           </vs-card>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" style="padding:0 8px" vs-sm="12">
            <vs-card>
           <highcharts :options="chartOptions2" :updateArgs="updateArgs"></highcharts>
           </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
        <vs-row vs-justify="center" class="mb-5">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="6"  style="padding:0 8px" vs-sm="12">
            <vs-card>
           <highcharts :options="chartOptions3" :updateArgs="updateArgs"></highcharts>
           </vs-card>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" style="padding:0 8px" vs-sm="12">
            <vs-card>
           <highcharts :options="chartOptions4" :updateArgs="updateArgs"></highcharts>
           </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
</div>
</template>

<script>
import axios from 'axios'
import Grafik from '@/components/Grafik.vue'

export default {
  components: {
    Grafik
  },
  data: function () {
    return {
      flag: '/',
      stats: {},
      statsPerDay: {},
      updateArgs: [true, true, { duration: 1000 }],
      chartOptions1: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Worldwide Daily New Cases'
        },
        xAxis: {
          categories: []
        },
        series: [{
          name: 'Cases',
          data: []
        }]
      },
      chartOptions2: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Worldwide Daily Deaths'
        },
        xAxis: {
          categories: []
        },
        series: [{
          name: 'Deaths',
          data: [],
          color: '#dc3545'
        }]
      },
      chartOptions3: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Worldwide Daily Active Cases'
        },
        xAxis: {
          categories: []
        },
        series: [{
          name: 'Active',
          data: [],
          color: '#ffc107'
        }]
      },
      chartOptions4: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Worldwide Daily Recovered'
        },
        xAxis: {
          categories: []
        },
        series: [{
          name: 'Recovered',
          data: [],
          color: '#6fcd98'
        }]
      }
    }
  },
  created: function () {
    var vm = this
    axios.get('https://disease.sh/v3/covid-19/countries/' + this.$route.params.country).then(resp => {
      this.stats = resp.data
      this.flag = resp.data.countryInfo.flag
    }).catch(function (error) {
      if (error !== undefined) {
        vm.$router.push('/404')
      }
    })
    axios.get('https://disease.sh/v3/covid-19/historical/' + this.$route.params.country + '?lastdays=all').then(resp => {
      this.statsPerDay = resp.data
      var niz = resp.data.timeline
      var arr1 = Object.values(niz.cases)
      var arr2 = Object.values(niz.deaths)
      var arr3 = Object.values(niz.recovered)
      var datumi = Object.keys(niz.cases).slice(0, -1)
      var casesDaily = []
      var deathsDaily = []
      var recoveredDaily = []
      var activeDaily = []
      for (var i = 0; i < arr1.length - 1; i++) {
        casesDaily.push(arr1[i + 1] - arr1[i])
        deathsDaily.push(arr2[i + 1] - arr2[i])
        recoveredDaily.push(arr3[i + 1] - arr3[i])
        activeDaily.push((casesDaily[i] - deathsDaily[i] - recoveredDaily[i]) < 0 ? 0 : (casesDaily[i] - deathsDaily[i] - recoveredDaily[i]))
      }
      this.chartOptions1.series[0].data = casesDaily
      this.chartOptions2.series[0].data = deathsDaily
      this.chartOptions3.series[0].data = activeDaily
      this.chartOptions4.series[0].data = recoveredDaily
      this.chartOptions1.xAxis.categories = datumi
      this.chartOptions2.xAxis.categories = datumi
      this.chartOptions3.xAxis.categories = datumi
      this.chartOptions4.xAxis.categories = datumi
    })
  },
  computed: {
    activePerc: function () {
      return (this.stats.active / this.stats.cases * 100).toFixed(2)
    },
    deathsPerc: function () {
      return (this.stats.deaths / this.stats.cases * 100).toFixed(2)
    },
    recoveredPerc: function () {
      return (this.stats.recovered / this.stats.cases * 100).toFixed(2)
    },
    todayDeathsPerc: function () {
      return (this.stats.todayDeaths / (this.stats.deaths > 0 ? this.stats.deaths : 1) * 100).toFixed(2)
    },
    todayActivePerc: function () {
      return (this.stats.todayCases / this.stats.cases * 100).toFixed(2)
    }
  },
  filters: {
    zarezi: function (value) {
      value += ''
      return value.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style scoped>
h2,h6 {
  display: inline;
}
</style>

<style>
g[aria-labelledby="id-66-title"]{
  display:none;
}

.dangerLight {
  color: rgb(242, 19, 93,0.75)
}
</style>
