<template>
  <div class="card__wrapper" @click="flip(index, character.char_id)" ref="card">
    <div
      class="card"
      :class="{
        'card--flip': flipped.includes(index),
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
  mounted() {
    this.getTransform()
  },
  watch: {
    'character.unlocked': function () {
      this.getTransform()
    },
  },
  methods: {
    getTransform() {
      if (this.character.unlocked) {
        const el = this.$refs.card as HTMLDivElement

        if (!el) {
          return
        }

        const boundaries = el.getBoundingClientRect()
        const top = boundaries.y + boundaries.height / 4
        const left = boundaries.x + boundaries.width / 2

        const moveX = window.innerWidth - left - 40
        const moveY = top * -1 - 40

        el.style.transform = `translate(${moveX}px, ${moveY}px) scale(0)`
      } else {
        return {
          transform: null,
        }
      }
    },
    flip(index: number, id: number) {
      this.$store.dispatch('cards/FLIP_CARD', { index, id })
    },
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
  transition: transform 0.6s, box-shadow 0.6s, top 0.3s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  border: 5px solid $color-white;
  top: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);

  &:hover {
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.4);
    top: -10px;
  }

  &--locked {
    cursor: not-allowed;
  }

  &--flip {
    transform: rotateY(180deg) scale(1);

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
    transition: transform 1s;
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
    box-shadow: 0 0 0 $color-yellow;
  }
  50% {
    box-shadow: 0 0 5px 5px $color-yellow;
  }
  100% {
    box-shadow: 0 0 0 $color-yellow;
  }
}
</style>
