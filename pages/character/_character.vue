<template>
  <div class="container">
    <nuxt-link class="btn" to="/">
      <icon-arrow-left />Back to game
    </nuxt-link>

    <div v-if="character" class="character">
      <div class="character__image-wrapper">
        <a class="character__image" v-if="character.unlocked" :href="character.img" target="blank">
          <img :src="character.img" :alt="character.name" />
        </a>
        <icon-lock class="character__icon" v-else />
      </div>
      <h1>{{ character.name }}</h1>
      <a
        :href="'https://www.imdb.com/search/name-text/?bio=' + character.portrayed"
        class="character__portrayed"
        target="blank"
      >Played by: {{ character.portrayed }}</a>

      <div class="character__facts">
        <div>
          <strong>Birthday:</strong>
          {{ character.birthday }}
        </div>
        <div>
          <strong>Occupation:</strong>
          {{ character.occupation.join(', ') }}
        </div>
        <div>
          <strong>Status:</strong>
          {{ character.status }}
        </div>
        <div>
          <strong>Nickname:</strong>
          {{ character.nickname }}
        </div>
        <div>
          <strong>Appearance:</strong>
          <a
            v-for="item in character.appearance"
            :key="item"
            :title="'Season ' + item"
            class="btn btn--small character__appearance"
            target="blank"
            :href="'https://www.imdb.com/title/tt0903747/episodes?season=' + item"
          >{{ item }}</a>
        </div>
      </div>

      <div class="characters__quotes"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconLock from '@/assets/svg/icon-lock.svg'
import IconArrowLeft from '@/assets/svg/icon-arrow-left.svg'
import { mapGetters } from 'vuex'
import { Character } from '@/@types'

export default Vue.extend({
  components: {
    IconLock,
    IconArrowLeft,
  },
  computed: {
    ...mapGetters({
      characters: 'characters/getCharacters',
    }),
    character() {
      return this.characters.find(
        (x: Character) => x.char_id.toString() === this.$route.params.character
      )
    },
  },
  props: {},
  methods: {},
})
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.container {
  max-width: 800px;
  margin: auto;
  padding: 30px;
}

.character {
  text-align: center;

  &__appearance {
    margin-right: 4px;
  }

  &__image-wrapper {
    margin: 30px auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid $color-primary;
    overflow: hidden;
    background: $color-black;
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
    display: block;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__portrayed {
    color: $color-gray;
  }

  &__facts {
    background: $color-black;
    padding: 16px;
    text-align: left;
    margin-top: 32px;

    strong {
      color: $color-gray;
      text-transform: uppercase;
      display: block;
      margin-top: 8px;
    }
  }
}
</style>
