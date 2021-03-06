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
      start: 'getStart',
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

        const left = boundaries.x + boundaries.width / 2
        const moveX = window.innerWidth - left - 40
        let moveY = 0
        const top = boundaries.y + boundaries.height / 4

        if (window.innerWidth >= 992) {
          moveY = top * -1 - 40
        } else {
          moveY = window.innerHeight - top - 40
        }

        el.style.transform = `translate(${moveX}px, ${moveY}px) scale(0) rotateY(180deg)`
      } else {
        return {
          transform: null,
        }
      }
    },
    flip(index: number, id: number) {
      this.$store.dispatch('cards/FLIP_CARD', { index, id })

      if (!this.start) {
        this.$store.dispatch('START', Date.now())
      }
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
  border-radius: 5px;
  border: 2px solid $color-white;
  top: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);

  @media (min-width: $media-md) {
    border: 5px solid $color-white;
    border-radius: 10px;
  }

  &:hover {
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.4);
    top: -10px;
  }

  &--locked {
    cursor: not-allowed;
  }

  &--flip {
    transform: rotateY(180deg) scale(1);
  }

  &__wrapper {
    width: 25%;
    height: 250px;
    max-height: 25vh;
    perspective: 600px;
    padding: 4px;
    transition: transform 1s;

    @media (min-width: $media-md) {
      padding: 8px;
    }
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
    max-width: 85%;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
