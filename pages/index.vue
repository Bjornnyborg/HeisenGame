<template>
  <div>
    <hg-intro />
    <div class="cards__wrapper">
      <div v-show="!isShowIntro" v-if="characters && characters.length" class="cards">
        <hg-card
          v-for="(character, index) in characters"
          :character="character"
          :index="index"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import HgIntro from '@/components/HgIntro.vue'
import HgCard from '@/components/HgCard.vue'

export default Vue.extend({
  components: {
    HgCard,
    HgIntro,
  },
  data() {
    return {
      active: true,
    }
  },
  computed: {
    ...mapGetters({
      isShowIntro: 'isShowIntro',
      characters: 'characters/getInGameCharacters',
    }),
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

  &__wrapper {
    display: flex;
    min-height: 100vh;
    align-items: center;
  }
}
</style>
