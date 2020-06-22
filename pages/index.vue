<template>
  <div>
    <hg-intro />

    <div v-show="!isShowIntro" v-if="characters.length">
      <div v-for="(character, index) in characters" :key="index">
        {{ character.name }} {{ character.unlocked }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import HgIntro from '../components/HgIntro.vue'

export default Vue.extend({
  components: {
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
  created() {
    this.$store.dispatch('characters/GET_CHARACTHERS')
  },
})
</script>

<style></style>
