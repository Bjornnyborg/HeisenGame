<template>
  <div class="navigation">
    <button
      class="navigation__toggle"
      :class="{ 'navigation__toggle--visible': !isShowIntro }"
      @click="toggleDrawer"
    >
      <icon-heisenberg
        class="navigation__icon"
        :class="{ 'navigation__icon--active': !open }"
      />
      <icon-cross
        class="navigation__icon"
        :class="{ 'navigation__icon--active': open }"
      />
      <span
        class="navigation__count"
        :class="{ 'navigation__count--bounce': bounce }"
        >{{ unlockedCharacters.length }}</span
      >
    </button>

    <div
      class="navigation__drawer"
      :class="{ 'navigation__drawer--open': open }"
    >
      <div class="navigation__content">
        <h1>Your unlocked characters:</h1>
        <hg-character
          v-for="person in characters"
          :key="person.char_id"
          :character="person"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import IconHeisenberg from '@/assets/svg/icon-heisenberg-outline.svg'
import IconCross from '@/assets/svg/icon-cross.svg'
import HgCharacter from '@/components/HgCharacter.vue'

export default Vue.extend({
  data() {
    return {
      bounce: false,
      open: false,
    }
  },
  components: {
    IconHeisenberg,
    IconCross,
    HgCharacter,
  },
  computed: {
    ...mapGetters({
      isShowIntro: 'isShowIntro',
      unlockedCharacters: 'characters/getUnlockedCharacters',
      characters: 'characters/getCharacters',
    }),
  },
  methods: {
    toggleDrawer() {
      this.open = !this.open
    },
  },
  watch: {
    unlockedCharacters: function () {
      this.bounce = true
      setTimeout(() => {
        this.bounce = false
      }, 1000)
    },
    $route: function () {
      this.open = false
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.navigation {
  &__icon {
    fill: $color-white;
    width: 30px;
    height: 30px;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s, transform 0.3s;
    transform: scale(0);

    &--active {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__drawer {
    width: 100%;
    height: 100vh;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    background: $color-black;
    z-index: 10;
    transition: transform 0.3s;
    transform: translateX(100%);

    &--open {
      transform: translateX(0);
    }
  }

  &__content {
    max-width: 800px;
    margin: 0 auto;
    padding: 15px 30px;
  }

  &__count {
    position: absolute;
    left: -8px;
    bottom: -8px;
    width: 25px;
    height: 25px;
    background: $color-black;
    color: $color-white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-radius: 50%;
    font-size: 14px;

    &--bounce {
      animation: bounce 1s infinite alternate;
    }
  }

  &__toggle {
    position: fixed;
    top: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    z-index: 20;
    border-radius: 50%;
    background: $color-primary;
    border: none;
    color: $color-white;
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 10px 10px 20px rgba($color-primary, 0.3);
    cursor: pointer;

    &:focus {
      outline: none;
      box-shadow: 0 0 10px rgba($color-primary, 1);
    }

    &:hover {
      transform: translateY(1px);
    }

    &:active {
      transform: translateY(3px);
    }

    &--visible {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
