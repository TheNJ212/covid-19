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
  </div>
</template>

<style scoped>
</style>

<script>
// @ is an alias to /src
import Mapa from '@/components/Mapa.vue'
import GrafikGlobal from '@/components/GrafikGlobal.vue'

export default {
  name: 'Home',
  components: {
    Mapa, GrafikGlobal
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
