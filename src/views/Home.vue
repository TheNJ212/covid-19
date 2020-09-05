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
     <vs-row vs-justify="center" style="my-3">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
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
    <vs-row vs-justify="center" class="my-3">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="6"  style="padding:0 8px" vs-sm="12">
            <h4 class="levo">Top countries with most coronavirus cases</h4>
            <p class="levo">Countries with most confirmed cases in numbers and percentage.</p>
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
            <h4 class="levo">Top countries with most deaths</h4>
            <p class="levo">Countries with largest death toll and their fatality rate.</p>
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
      items: {}
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
  watch: {
    items: function (val, oldval) {
      if (val !== oldval) {
        console.log(val)
        console.log(oldval)
        this.toggleBusy()
      }
    }
  },
  created () {
    axios.get('https://disease.sh/v3/covid-19/countries').then(resp => {
      this.items = resp.data
    })
  },
  methods: {
    toggleBusy () {
      this.isBusy = !this.isBusy
    }
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
