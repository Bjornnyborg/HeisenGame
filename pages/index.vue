<template>
  <div>
    <hg-intro />
    <hg-scoreboard />

    <div class="cards__wrapper">
      <div
        v-show="!isShowIntro && !isShowScoreboard"
        v-if="characters && characters.length"
        class="cards"
      >
        <div class="cards__clouds" />
        <hg-card
          v-for="(character, index) in characters"
          :character="character"
          :index="index"
          :key="character.char_id + '_' + index"
        />

        <hg-timer />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import HgIntro from '@/components/HgIntro.vue'
import HgCard from '@/components/HgCard.vue'
import HgTimer from '@/components/HgTimer.vue'
import HgScoreboard from '@/components/HgScoreboard.vue'
import { Character } from '../@types'

export default Vue.extend({
  components: {
    HgCard,
    HgIntro,
    HgScoreboard,
    HgTimer,
  },
  data() {
    return {
      active: true,
    }
  },
  computed: {
    ...mapGetters({
      isShowIntro: 'isShowIntro',
      isShowScoreboard: 'isShowScoreboard',
      characters: 'characters/getInGameCharacters',
      lockedCharacters: 'characters/getLockedInGameCharacters',
    }),
  },
  watch: {
    lockedCharacters: function (value) {
      if (value.length === 0) {
        this.$store.dispatch('characters/LEVEL_DONE')
      }
    },
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 4px;

  &__wrapper {
    display: flex;
    min-height: 100vh;
    align-items: center;
  }

  &__clouds {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;

    &:before {
      animation: slide1 45s linear infinite;
    }

    &:after {
      position: absolute;
      animation: slide2 55s linear infinite;
    }

    &:after,
    &:before {
      content: url('/img/cloud.png');
      top: 10px;
      display: block;
      width: auto;
    }
  }
}

@keyframes slide1 {
  0% {
    transform: translate(-50px, -300px);
    opacity: 0.1;
  }
  10% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.2;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translate(50px, -300px);
    opacity: 0;
  }
}

@keyframes slide2 {
  0% {
    transform: translate(-300px, -20%);
    opacity: 0;
  }
  10% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
  90% {
    opacity: 0.2;
  }
  100% {
    transform: translate(800px, -20%);
    opacity: 0;
  }
}
</style>
