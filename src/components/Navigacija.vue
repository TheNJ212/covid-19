
<template>
  <div class="centerx">
    <vs-row vs-align="flex-start"
  vs-type="flex" vs-justify="center"><vs-col vs-w="6" vs-sm="12">
    <vs-navbar
      v-model="indexActive"
      :color="colorx"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="myNavbar"
      style="box-shadow: none;">
      <div slot="title">
        <vs-navbar-title>
            Covid-19 tracker
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0" >
        <a href="#"><router-link to="/">Home</router-link></a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
         <a href="#"><router-link to="/about">About</router-link></a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
         <a href="#"><router-link to="/countries">Countries</router-link></a>
      </vs-navbar-item>
    </vs-navbar>
    </vs-col></vs-row>
  </div>
</template>

<script>
export default {
  name: 'Navigacija',
  data: () => ({
    colorx: 'rgb(255, 71, 87)',
    indexActive: 0
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

.input-color {
  margin-bottom: 10px;
  position: relative;
  display: block;
}

.myNavbar {
  color: #fff;
  font-family: 'Roboto Condensed', sans-serif;
}
.centerx{
  margin-bottom:30px;
  background-color: rgb(255, 71, 87);
}
</style>
