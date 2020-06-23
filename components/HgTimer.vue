<template>
  <div class="clock">{{ time }}s</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Character } from '../@types'

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
    this.startTime()
  },
  methods: {
    startTime() {
      this.$store.dispatch('START', Date.now())
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
  watch: {
    lockedCharacters: function (value) {
      if (value.length === 0) {
        this.stopTime()
      } else if (value.length === 12) {
        this.startTime()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.clock {
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 20px;
  width: 100%;
  text-align: center;
  padding: 16px;
}
</style>
