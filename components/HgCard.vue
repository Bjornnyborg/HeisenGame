<template>
  <div class="card__wrapper" @click="flip">
    <div class="card" :class="{ 'card--flip': flipped }">
      <div class="card__face card__face--front"></div>
      <div class="card__face card__face--back"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconHeisenberg from '@/assets/svg/icon-heisenberg-outline.svg'

export default Vue.extend({
  components: {
    IconHeisenberg,
  },
  data() {
    return {
      flipped: false,
    }
  },
  methods: {
    flip() {
      this.flipped = true
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;

  &--flip {
    transform: rotateY(180deg);
  }

  &__wrapper {
    width: 200px;
    height: 260px;
    perspective: 600px;
  }

  &__face {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 260px;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    &--front {
      background: red;
    }

    &--back {
      background: blue;
      transform: rotateY(180deg);
    }
  }
}
</style>
