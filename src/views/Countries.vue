<template lang="html">
  <div>
    <vs-row vs-justify="center">
      <vs-col vs-w="8" vs-xs="12" vs-sm="10" style="padding:0 8px">
        <h3 style="text-align: left">Coronavirus outbreak by country</h3>
        <p style="text-align: left">
          <b>
            {{ $parent.globalStats.todayCases | zarezi }} new confirmed cases</b
          >
          and
          <b>{{ $parent.globalStats.todayDeaths | zarezi }} new deaths</b> are
          reported <b>today</b> so far globally. 2019 Novel
          <b>Coronavirus</b> has affected
          <b>215 countries and territories</b> and there are
          <b>{{ $parent.globalStats.cases | zarezi }} total confirmed</b> cases,
          <b>{{ $parent.globalStats.deaths | zarezi }} total deaths</b>, and
          <b>{{ $parent.globalStats.recovered | zarezi }} total recoveries</b>
          from <b>COVID-19</b> worldwide. Below is the list of
          <b>countries with coronavirus live statistics</b> for active cases,
          new cases and deaths, total confirmed cases and deaths, and
          recoveries.
        </p>
      </vs-col>
      <vs-col vs-w="8" vs-xs="12" vs-sm="10" style="padding:0 8px">
        <vs-card>
          <div>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="Filter"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''"
                      >Clear</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-table
              hover
              :items="items"
              :fields="fields"
              :head-variant="'light'"
              :bordered="true"
              :filter="filter"
              :busy="isBusy"
              responsive
            >
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template v-slot:cell(country)="data">
                <div>
                  <router-link :to="`/countries/${data.value}`">
                  <img :src="data.item.countryInfo.flag" />
                  <span> {{ data.item.country }}</span>
                  </router-link>
                </div>
              </template>
              <template v-slot:cell(active)="data">
                  <div>{{data.value | zarezi}}</div>
              </template>
              <template v-slot:cell(todayCases)="data">
                  <div>{{data.value | zarezi}}</div>
              </template>
              <template v-slot:cell(cases)="data">
                  <div>{{data.value | zarezi}}</div>
              </template>
              <template v-slot:cell(todayDeaths)="data">
                  <div>{{data.value | zarezi}}</div>
              </template>
              <template v-slot:cell(deaths)="data">
                 <div>{{data.value | zarezi}}</div>
              </template>
              <template v-slot:cell(recovered)="data">
                  <div>{{data.value | zarezi}}</div>
              </template>
            </b-table>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      isBusy: true,
      fields: [
        {
          key: 'country',
          label: 'Country/Territory',
          sortable: true,
          tdClass: 'levo'
        },
        {
          key: 'active',
          label: 'Active Cases',
          sortable: true,
          tdClass: 'desno'
        },
        {
          key: 'todayCases',
          label: 'New Cases',
          sortable: true,
          tdClass: 'desno'
        },
        {
          key: 'cases',
          label: 'Total Cases',
          sortable: true,
          tdClass: 'desno'
        },
        {
          key: 'todayDeaths',
          label: 'New Deaths',
          sortable: true,
          tdClass: 'desno'
        },
        {
          key: 'deaths',
          label: 'Total Deaths',
          sortable: true,
          tdClass: 'desno'
        },
        {
          key: 'recovered',
          label: 'Total Recovered',
          sortable: true,
          tdClass: 'desno'
        }
      ],
      items: [],
      filter: null
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
  },
  watch: {
    items: function (val, oldval) {
      if (val !== oldval) {
        this.toggleBusy()
      }
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
td img {
  max-height: 14px;
}
</style>

<style>
.levo {
  text-align: left;
}

.desno {
  text-align: right;
}
</style>
