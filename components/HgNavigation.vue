<template>
  <div class="navigation">
    <button
      class="navigation__toggle"
      :class="{ 'navigation__toggle--visible': !isShowIntro }"
    >
      <icon-heisenberg class="navigation__icon" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import IconHeisenberg from '@/assets/svg/icon-heisenberg-outline.svg'

export default Vue.extend({
  components: {
    IconHeisenberg,
  },
  computed: {
    ...mapGetters(['isShowIntro']),
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.navigation {
  &__icon {
    fill: $color-white;
    width: 30px;
    height: 30px;
  }

  &__toggle {
    position: fixed;
    top: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
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
</style>
