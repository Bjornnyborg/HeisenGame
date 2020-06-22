<template>
  <div class="intro" :class="{ 'intro--active': isShowIntro }">
    <h1 class="intro__title">Heisen Game</h1>
    <p class="intro__text">
      Match characters in a classic memory game,
      <br />to unlock information and quotes!
    </p>
    <button @click="close" class="btn">Let's get cooking!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
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

  &--active {
    opacity: 1;
    visibility: visible;
  }

  &__title {
    font-size: 72px;
    text-align: center;
    font-weight: normal;
  }

  &__text {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
}
</style>
