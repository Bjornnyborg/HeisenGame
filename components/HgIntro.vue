<template>
  <div class="intro" :class="{ 'intro--active': isShowIntro }">
    <icon-logo class="intro__logo" />
    <p class="intro__text">
      Match characters in a classic memory game,
      <br />to unlock information about them!
    </p>
    <button @click="close" class="btn">Let's get cooking!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import IconLogo from '@/assets/svg/icon-logo.svg'

export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconLogo,
  },
  computed: {
    ...mapGetters(['isShowIntro']),
  },
  methods: {
    close() {
      this.$store.commit('setShowIntro', false)
    },
  },
})
</script>

<style lang="scss" scoped>
.intro {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  padding: 16px;

  &--active {
    opacity: 1;
    visibility: visible;
  }

  &__logo {
    margin-bottom: 32px;
    max-width: 60%;
    width: 400px;
  }

  &__text {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
}
</style>
