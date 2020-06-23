<template>
  <div
    class="character"
    :class="{ 'character--locked': !character.unlocked }"
    @click="navigate()"
  >
    <div class="character__image-wrapper">
      <img
        class="character__image"
        v-if="character.unlocked"
        :src="character.img"
        :alt="character.name"
      />
      <icon-lock class="character__icon" v-else />
    </div>

    <div>
      <strong>
        {{ character.name }}
      </strong>
      <div class="character__portrayed">
        Played by: {{ character.portrayed }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconLock from '@/assets/svg/icon-lock.svg'

export default Vue.extend({
  components: {
    IconLock,
  },
  props: {
    character: {
      type: Object,
    },
  },
  methods: {
    navigate() {
      if (this.character.unlocked) {
        this.$router.push({
          path: '/character/' + this.character.char_id,
        })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.character {
  display: flex;
  align-items: center;
  margin-top: 16px;
  cursor: pointer;

  &--locked {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__image-wrapper {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid $color-primary;
    margin-right: 16px;
    overflow: hidden;
  }

  &__icon {
    fill: $color-white;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__portrayed {
    color: $color-gray;
  }
}
</style>
