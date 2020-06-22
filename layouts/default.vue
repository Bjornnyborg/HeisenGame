<template>
  <div>
    <hg-navigation />
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HgNavigation from '@/components/HgNavigation.vue'

export default Vue.extend({
  components: {
    HgNavigation,
  },
  created() {
    this.$store.dispatch('characters/GET_CHARACTHERS')
  },
})
</script>

<style lang="scss">
@import '../assets/scss/master.scss';
</style>
