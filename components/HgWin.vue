<template>
  <div class="win" :class="{ 'win--active': isFinished && !isShowIntro && !isShowScoreboard }">
    <h1>WIN!</h1>
    <p>You won the game! Go explore the characters</p>
    <div class="win__action">
      <button @click="reload" class="btn">Or try again</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      isFinished: 'characters/isFinished',
      isShowScoreboard: 'isShowScoreboard',
      isShowIntro: 'isShowIntro',
    }),
  },
  methods: {
    reload() {
      window.location.reload()
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.win {
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

  &__action {
    margin-top: 30px;
  }
}
</style>
