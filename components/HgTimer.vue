<template>
  <div class="clock">{{ time }}s</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Character } from '../@types'
import { DECKSIZE } from '../constants'

export default Vue.extend({
  data() {
    return {
      time: 0,
      timer: null,
    }
  },
  computed: {
    ...mapGetters({
      start: 'getStart',
      stop: 'getStop',
      lockedCharacters: 'characters/getLockedInGameCharacters',
    }),
  },
  mounted() {
    if (this.start !== 0) {
      this.startTime()
    }
  },
  watch: {
    start: function (value) {
      if (value !== 0) {
        this.startTime()
      }
    },
  },
  methods: {
    startTime() {
      this.getClock()
      ;(this as any).timer = setInterval(() => this.getClock(), 1000)
    },
    stopTime() {
      clearInterval((this as any).timer)
      this.$store.dispatch('STOP', this.time)
    },
    getClock() {
      this.time = Math.floor((Date.now() - this.start) / 1000)
    },
  },
  beforeDestroy() {
    this.stopTime()
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.clock {
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 24px;
  width: 100%;
  text-align: center;
  padding: 16px;

  @media (min-width: $media-md) {
    font-size: 32px;
  }
}
</style>
