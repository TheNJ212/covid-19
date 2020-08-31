<template>
  <div id="app">
    <Navigacija></Navigacija>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fdfdfd;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat';
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Navigacija from '@/components/Navigacija.vue'
import axios from 'axios'

export default {
  components: {
    Navigacija
  },
  data: function () {
    return {
      globalStats: {},
      statsPerCountry: {}
    }
  },
  created () {
    axios.get('https://disease.sh/v3/covid-19/all').then(resp => {
      this.globalStats = resp.data
    })
    axios.get('https://disease.sh/v3/covid-19/countries').then(resp => {
      this.statsPerCountry = resp.data
    })
  }
}
</script>>
