<template>
  <div class="home">
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3"  style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h3>Total Cases</h3>
              </div>
              <div>
                <h2 style="color:#5b3cc4">{{$parent.globalStats.cases | zarezi}}</h2>
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
                <h2 style="color:rgb(255, 130, 0);">{{$parent.globalStats.active | zarezi}}</h2><h6> / {{activePerc}}%</h6>
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
                <h2 style="color:rgb(242, 19, 93)">{{$parent.globalStats.deaths | zarezi}}</h2><h6> / {{deathsPerc}}%</h6>
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
                <h2 style="color:rgb(23, 201, 100)">{{$parent.globalStats.recovered | zarezi}}</h2><h6> / {{recoveredPerc}}%</h6>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <Mapa></Mapa>
    <GrafikGlobal></GrafikGlobal>
     <vs-row vs-justify="center" class="mt-4">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <div class="" style="padding:0 8px">
            <h4 class="levo">Today's Stats</h4>
            <p class="levo">Live statistics on new confirmed cases and new deaths.</p>
        </div>
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6"  style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h4>Today's Confirmed Cases</h4>
              </div>
              <div>
                <h2 style="color:#5b3cc4">  {{ $parent.globalStats.todayCases | zarezi}} </h2>
                <h6 class="dangerLight"><b-icon-arrow-up font-scale='1.8'></b-icon-arrow-up>{{activePercToday}}%</h6>
                <p class="text-muted mt-2">Total new cases / Percentage increase</p>
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
                <h2 style="color:rgb(242, 19, 93)">{{ $parent.globalStats.todayDeaths | zarezi}}</h2>
                <h6 class="dangerLight"><b-icon-arrow-up font-scale='1.8'></b-icon-arrow-up>{{deathsPercToday}}%</h6>
                <p class="text-muted mt-2"> Total new deaths / Percentage increase</p>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center" class="mb-2">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="6"  style="padding:0 8px" vs-sm="12">
            <b-table
              hover
              :items="items"
              :fields="tabela1.fields"
              :head-variant="'light'"
              :bordered="true"
              :sort-by.sync="sortBy1"
              :sort-desc.sync="sortDesc"
              :per-page="perPage"
            >
              <template v-slot:cell(country)="data">
                <div>
                  <router-link :to="`/countries/${data.value}`">
                  <img :src="data.item.countryInfo.flag" />
                  <span> {{ data.item.country }}</span>
                  </router-link>
                </div>
              </template>
              <template v-slot:cell(todayCases)="data">
                {{data.item.todayCases | zarezi}}
              </template>
              <template v-slot:cell(percentage)="data">
                {{(data.item.todayCases / data.item.cases *100).toFixed(2)}}%
              </template>
            </b-table>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" style="padding:0 8px" vs-sm="12">
            <b-table
              hover
              :items="items"
              :fields="tabela2.fields"
              :head-variant="'light'"
              :bordered="true"
              :sort-by.sync="sortBy2"
              :sort-desc.sync="sortDesc"
              :per-page="perPage"
            >
              <template v-slot:cell(country)="data">
                <div>
                  <router-link :to="`/countries/${data.value}`">
                  <img :src="data.item.countryInfo.flag" />
                  <span> {{ data.item.country }}</span>
                  </router-link>
                </div>
              </template>
              <template v-slot:cell(todayCases)="data">
                {{data.item.todayCases | zarezi}}
              </template>
              <template v-slot:cell(percentage)="data">
                {{(data.item.todayDeaths / data.item.deaths *100).toFixed(2)}}%
              </template>
            </b-table>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>

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
            <h4 class="levo">Top countries with most coronavirus cases</h4>
            <p class="levo">Countries with most confirmed cases in numbers and percentage.</p>
            <b-table
              hover
              :items="items"
              :fields="tabela3.fields"
              :head-variant="'dark'"
              :bordered="true"
              :sort-by.sync="sortBy3"
              :sort-desc.sync="sortDesc"
              :per-page="perPage"
            >
              <template v-slot:cell(country)="data">
                <div>
                  <router-link :to="`/countries/${data.value}`">
                  <img :src="data.item.countryInfo.flag" />
                  <span> {{ data.item.country }}</span>
                  </router-link>
                </div>
              </template>
              <template v-slot:cell(cases)="data">
                {{data.item.cases | zarezi}}
              </template>
              <template v-slot:cell(percentage)="data">
                {{(data.item.cases / $parent.globalStats.cases *100).toFixed(2)}}%
              </template>
            </b-table>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" style="padding:0 8px" vs-sm="12">
            <h4 class="levo">Top countries with most deaths</h4>
            <p class="levo">Countries with largest death toll and their fatality rate.</p>
            <b-table
              hover
              :items="items"
              :fields="tabela4.fields"
              :head-variant="'dark'"
              :bordered="true"
              :sort-by.sync="sortBy4"
              :sort-desc.sync="sortDesc"
              :per-page="perPage"
            >
              <template v-slot:cell(country)="data">
                <div>
                  <router-link :to="`/countries/${data.value}`">
                  <img :src="data.item.countryInfo.flag" />
                  <span> {{ data.item.country }}</span>
                  </router-link>
                </div>
              </template>
              <template v-slot:cell(deaths)="data">
                {{data.item.deaths | zarezi}}
              </template>
              <template v-slot:cell(percentage)="data">
                {{(data.item.deaths / data.item.cases *100).toFixed(2)}}%
              </template>
            </b-table>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center" class="mb-2">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="6"  style="padding:0 8px" vs-sm="12">
            <h4 class="levo">Top countries with most active cases</h4>
            <p class="levo">Countries with largest infected number of people and their percentage.</p>
            <b-table
              hover
              :items="items"
              :fields="tabela5.fields"
              :head-variant="'light'"
              :bordered="true"
              :sort-by.sync="sortBy5"
              :sort-desc.sync="sortDesc"
              :per-page="perPage"
            >
              <template v-slot:cell(country)="data">
                <div>
                  <router-link :to="`/countries/${data.value}`">
                  <img :src="data.item.countryInfo.flag" />
                  <span> {{ data.item.country }}</span>
                  </router-link>
                </div>
              </template>
              <template v-slot:cell(active)="data">
                {{data.item.active | zarezi}}
              </template>
              <template v-slot:cell(percentage)="data">
                {{(data.item.active / data.item.cases *100).toFixed(2)}}%
              </template>
            </b-table>
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6" style="padding:0 8px" vs-sm="12">
            <h4 class="levo">Top countries with most recovered people</h4>
            <p class="levo">Countries with highest rate of recoveries.</p>
            <b-table
              hover
              :items="items"
              :fields="tabela6.fields"
              :head-variant="'light'"
              :bordered="true"
              :sort-by.sync="sortBy6"
              :sort-desc.sync="sortDesc"
              :per-page="perPage"
            >
              <template v-slot:cell(country)="data">
                <div>
                  <router-link :to="`/countries/${data.value}`">
                  <img :src="data.item.countryInfo.flag" />
                  <span> {{ data.item.country }}</span>
                  </router-link>
                </div>
              </template>
              <template v-slot:cell(recovered)="data">
                {{data.item.recovered | zarezi}}
              </template>
              <template v-slot:cell(percentage)="data">
                {{(data.item.recovered / data.item.cases *100).toFixed(2)}}%
              </template>
            </b-table>
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

<style scoped>
</style>

<script>
// @ is an alias to /src
import Mapa from '@/components/Mapa.vue'
import GrafikGlobal from '@/components/GrafikGlobal.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Mapa, GrafikGlobal
  },
  data: function () {
    return {
      sortBy1: 'todayCases',
      sortBy2: 'todayDeaths',
      sortBy3: 'cases',
      sortBy4: 'deaths',
      sortBy5: 'active',
      sortBy6: 'recovered',
      sortDesc: true,
      perPage: 10,
      tabela1: {
        fields: [
          {
            key: 'country',
            label: 'Country/Territory',
            tdClass: 'levo'
          },
          {
            key: 'todayCases',
            label: 'New Cases',
            tdClass: 'desno'
          },
          {
            key: 'percentage',
            label: '% Increase',
            tdClass: 'desno'
          }
        ]
      },
      tabela2: {
        fields: [
          {
            key: 'country',
            label: 'Country/Territory',
            tdClass: 'levo'
          },
          {
            key: 'todayDeaths',
            label: 'New Deaths',
            tdClass: 'desno'
          },
          {
            key: 'percentage',
            label: '% Increase',
            tdClass: 'desno'
          }
        ]
      },
      tabela3: {
        fields: [
          {
            key: 'country',
            label: 'Country/Territory',
            tdClass: 'levo'
          },
          {
            key: 'cases',
            label: 'Total Cases',
            tdClass: 'desno'
          },
          {
            key: 'percentage',
            label: 'Worldwide',
            tdClass: 'desno'
          }
        ]
      },
      tabela4: {
        fields: [
          {
            key: 'country',
            label: 'Country/Territory',
            tdClass: 'levo'
          },
          {
            key: 'deaths',
            label: 'Total Deaths',
            tdClass: 'desno'
          },
          {
            key: 'percentage',
            label: 'Fatality Rate',
            tdClass: 'desno'
          }
        ]
      },
      tabela5: {
        fields: [
          {
            key: 'country',
            label: 'Country/Territory',
            tdClass: 'levo'
          },
          {
            key: 'active',
            label: 'Active Cases',
            tdClass: 'desno'
          },
          {
            key: 'percentage',
            label: '%',
            tdClass: 'desno'
          }
        ]
      },
      tabela6: {
        fields: [
          {
            key: 'country',
            label: 'Country/Territory',
            tdClass: 'levo'
          },
          {
            key: 'recovered',
            label: 'Recovered',
            tdClass: 'desno'
          },
          {
            key: 'percentage',
            label: '%',
            tdClass: 'desno'
          }
        ]
      },
      items: [],
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
  computed: {
    activePerc: function () {
      return (this.$parent.globalStats.active / this.$parent.globalStats.cases * 100).toFixed(2)
    },
    deathsPerc: function () {
      return (this.$parent.globalStats.deaths / this.$parent.globalStats.cases * 100).toFixed(2)
    },
    recoveredPerc: function () {
      return (this.$parent.globalStats.recovered / this.$parent.globalStats.cases * 100).toFixed(2)
    },
    activePercToday: function () {
      return (this.$parent.globalStats.todayCases / this.$parent.globalStats.cases * 100).toFixed(2)
    },
    deathsPercToday: function () {
      return (this.$parent.globalStats.todayDeaths / this.$parent.globalStats.deaths * 100).toFixed(2)
    }
  },
  filters: {
    zarezi: function (value) {
      value += ''
      return value.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
  },
  created () {
    axios.get('https://disease.sh/v3/covid-19/countries').then(resp => {
      this.items = resp.data
    })
    axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(resp => {
      var niz = resp.data
      var arr1 = Object.values(niz.cases)
      var arr2 = Object.values(niz.deaths)
      var arr3 = Object.values(niz.recovered)
      var datumi = Object.keys(niz.cases).slice(0, -1)
      var casesDaily = []
      var deathsDaily = []
      var recoveredDaily = []
      var activeDaily = []
      for (var i = 0; i < arr1.length - 1; i++) {
        casesDaily.push((arr1[i + 1] - arr1[i]) < 0 ? 0 : (arr1[i + 1] - arr1[i]))
        deathsDaily.push((arr2[i + 1] - arr2[i]) < 0 ? 0 : (arr2[i + 1] - arr2[i]))
        recoveredDaily.push((arr3[i + 1] - arr3[i]) < 0 ? 0 : (arr3[i + 1] - arr3[i]))
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
  }
}
</script>

<style scoped>
h2,h6 {
  display: inline;
}

td img {
  max-height: 14px;
}
</style>

<style>
.highcharts-credits{
  display: none;
}
</style>
