<template>
  <div>
    <hg-navigation />
    <div class="clouds" />

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

.clouds {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;

  &:before {
    animation: slide1 45s linear infinite;
  }

  &:after {
    position: absolute;
    animation: slide2 55s linear infinite;
  }

  &:after,
  &:before {
    content: url('/img/cloud.png');
    top: 10px;
    display: block;
    width: auto;
  }
}

@keyframes slide1 {
  0% {
    transform: translate(-50px, -300px);
    opacity: 0.1;
  }
  10% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.2;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translate(50px, -300px);
    opacity: 0;
  }
}

@keyframes slide2 {
  0% {
    transform: translate(-300px, -20%);
    opacity: 0;
  }
  10% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    transform: translate(800px, -20%);
    opacity: 0;
  }
}
</style>
