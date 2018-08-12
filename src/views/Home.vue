<template>
  <div class="home">
    <Map v-show="currentNav === 0"/>
    <Market v-if="currentNav === 1"/>
    <Profile v-if="currentNav === 2"/>
    <div class="phone-viewport md-layout md-gutter md-alignment-center">
      <md-bottom-bar md-type="shift" :md-theme="'bottom-bar-' + theme" class="md-layout-item md-xsmall-size-100">
        <md-bottom-bar-item md-label="Home" md-icon="place" @click="changeNav(0)"></md-bottom-bar-item>
        <md-bottom-bar-item md-label="Market" md-icon="store" @click="changeNav(1)"></md-bottom-bar-item>
        <md-bottom-bar-item md-label="Profile" md-icon="account_circle" @click="changeNav(2)"></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue';
import Market from '@/components/Market.vue';
import Profile from '@/components/Profile.vue';

export default {
  name: 'home',
  components: {
    Map,
    Market,
    Profile
  },
  data: function() {
    return {
      theme: 'teal',
      currentNav: 0,
    }
  },

  methods: {
    changeNav(index) {
      console.log(this.currentNav, index);
      let colors = ['teal', 'orange', 'red'];
      this.currentNav = index;
      this.theme = colors[index];
    }
  }
}
</script>

<style scoped>
.phone-viewport {
  width: 100vw;
  margin: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  display: inline-flex;
  align-items: flex-end;
  overflow: hidden;
  border: 1px solid rgba(#000, .26);
  background: rgba(#000, .06);
  z-index: 1;
}
.phone-viewport md-bottom-bar {
  height: 10vh;
}
.md-bottom-bar > .md-ripple {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly !important;
}
.md-layout.md-gutter {
  margin: 0
}
</style>

<style lang="scss">
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("bottom-bar-teal", (
    primary: #1eb980
  ));

  @include md-register-theme("bottom-bar-orange", (
    primary: #ed7d3a,
    accent: #363537,
    theme: dark
  ));

  @include md-register-theme("bottom-bar-red", (
    primary: #ef2d56,
    accent: #363537,
    theme: dark
  ));

  @import "~vue-material/dist/theme/all";
</style>
