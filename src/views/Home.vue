<template>
  <div class="home">
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-row vs-align="center" vs-justify="center" vs-type="flex">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3"  style="padding:0 8px" vs-sm="12">
            <vs-card>
              <div slot="header">
                <h3 >Total Cases</h3>
              </div>
              <div>
                <h2 style="color:#5b3cc4">{{totalCases}}</h2>
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
                <h2 style="color:rgb(255, 130, 0)">{{totalCases}}</h2>
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
                <h2 style="color:rgb(242, 19, 93)">{{totalCases}}</h2>
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
                <h2 style="color:rgb(23, 201, 100)">{{totalCases}}</h2>
              </div>
              <div slot="footer"></div>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <Mapa></Mapa>
  </div>
</template>

<style scoped>
</style>

<script>
// @ is an alias to /src
import Mapa from '@/components/Mapa.vue'

export default {
  name: 'Home',
  components: {
    Mapa
  },
  data: function () {
    return {
      totalCases: 134141
    }
  }
}
</script>
