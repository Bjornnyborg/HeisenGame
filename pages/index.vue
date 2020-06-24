<template>
  <div>
    <hg-intro />
    <hg-scoreboard />

    <div class="cards__wrapper">
      <div
        v-if="characters && characters.length && !isShowIntro && !isShowScoreboard"
        class="cards"
      >
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
}
</style>
