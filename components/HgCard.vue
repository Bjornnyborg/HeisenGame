<template>
  <div class="card__wrapper" @click="flip(index, character.char_id)">
    <div
      class="card"
      :class="{
        'card--flip': flipped.includes(index),
        'card--done': character.unlocked,
        'card--locked': isLocked,
      }"
    >
      <div class="card__face card__face">
        <icon-heisenberg class="card__icon" />
      </div>
      <div class="card__face card__face--back">
        <img class="card__image" :src="character.img" alt />
      </div>
    </div>
    <div v-if="quotes[character.name]">{{ quotes[character.name].quote }}</div>
    {{ character.name }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconHeisenberg from '@/assets/svg/icon-heisenberg-outline.svg'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: {
    IconHeisenberg,
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters({
      flipped: 'cards/getFlipped',
      unlockedCharacters: 'characters/getUnlockedCharacters',
      isLocked: 'cards/getLocked',
      quotes: 'quotes/getQuotes',
    }),
  },
  methods: {
    flip(index: number, id: number) {
      this.$store.dispatch('cards/FLIP_CARD', { index, id })
    },
  },
  mounted() {
    if (this.character) {
      this.$store.dispatch('quotes/GET_QUOTES', this.character.name)
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.card {
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  border: 5px solid $color-white;

  &--locked {
    cursor: not-allowed;
  }

  &--flip {
    transform: rotateY(180deg) scale(1);
    transition: transform 1s;

    &.card--locked {
      animation-name: blink;
      animation-duration: 0.25s;
      animation-iteration-count: 2;
      animation-timing-function: linear;
      animation-delay: 0.75s;
    }
  }

  &--done {
    transform: rotateY(180deg) scale(0);
    transition: transform 0.5s;
  }

  &__wrapper {
    width: 25%;
    height: 250px;
    perspective: 600px;
    padding: 12px;
  }

  &__face {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: $color-primary;
    display: flex;
    justify-content: center;
    align-items: center;

    &--back {
      transform: rotateY(180deg);
    }
  }

  &__icon {
    width: 100px;
    height: 100px;
    fill: $color-white;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@keyframes blink {
  0% {
    box-shadow: 0 0 0 $color-white;
  }
  50% {
    box-shadow: 0 0 15px 5px $color-white;
  }
  100% {
    box-shadow: 0 0 0 $color-white;
  }
}
</style>
