<template>
  <div>
    <hg-navigation />
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HgNavigation from '../components/HgNavigation.vue'

export default Vue.extend({
  components: {
    HgNavigation,
  },
})
</script>

<style lang="scss">
@import '../assets/scss/master.scss';
</style>
