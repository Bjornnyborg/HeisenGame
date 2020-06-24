<template>
  <div class="container">
    <nuxt-link class="btn" to="/" v-if="character && character.unlocked">
      <icon-arrow-left />Back to game
    </nuxt-link>

    <div v-if="character" class="character">
      <div class="character__image-wrapper">
        <a class="character__image" v-if="character.unlocked" :href="character.img" target="blank">
          <img :src="character.img" :alt="character.name" />
          <span class="character__image-link">
            <icon-share />
          </span>
        </a>
        <icon-lock class="character__icon" v-else />
      </div>
      <h1>{{ character.name }}</h1>

      <div class="character__facts" v-if="character.unlocked">
        <a
          :href="'https://www.imdb.com/search/name-text/?bio=' + character.portrayed"
          class="character__portrayed"
          target="blank"
        >
          Actor: {{ character.portrayed }}
          <icon-share />
        </a>

        <div class="character__fact">
          <strong>Birthday:</strong>
          {{ character.birthday }}
        </div>
        <div class="character__fact">
          <strong>Occupation:</strong>
          {{ character.occupation.join(', ') }}
        </div>
        <div class="character__fact">
          <strong>Status:</strong>
          {{ character.status }}
        </div>
        <div class="character__fact">
          <strong>Nickname:</strong>
          {{ character.nickname }}
        </div>
        <div class="character__fact">
          <strong>Appearing in season:</strong>
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
      <div v-else class="character__locked">
        <p>Play more, to unlock information about this character</p>

        <nuxt-link class="btn" to="/">Back to game</nuxt-link>
      </div>
    </div>
    <div v-else-if="characters.length && !character" class="character__not-found">
      <h1>Character not found</h1>
      <nuxt-link class="btn" to="/">
        <icon-arrow-left />Back to game
      </nuxt-link>
    </div>
    <hg-loading v-else />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconLock from '@/assets/svg/icon-lock.svg'
import IconArrowLeft from '@/assets/svg/icon-arrow-left.svg'
import IconShare from '@/assets/svg/icon-share.svg'
import HgLoading from '@/components/HgLoading.vue'
import { mapGetters } from 'vuex'
import { Character } from '@/@types'

export default Vue.extend({
  components: {
    HgLoading,
    IconLock,
    IconArrowLeft,
    IconShare,
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
  padding: 16px;

  @media (min-width: $media-md) {
    padding: 32px;
  }
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  &__image-link {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 15px;
    right: 15px;
    background: $color-primary;
    padding: 8px;
    border-radius: 50%;

    svg {
      fill: $color-white;
    }
  }

  &__not-found {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__icon {
    fill: $color-white;
    width: 75px;
    height: 75px;
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
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid $color-primary;
    }
  }

  &__portrayed {
    color: $color-white;
    width: 100%;
    text-align: center;
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1em;
      height: 1em;
      margin-left: 3px;
      fill: $color-white;
    }
  }

  &__facts {
    border-radius: 8px;
    background: $color-gray-dark;
    color: $color-white;
    padding: 16px;
    text-align: left;
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;

    @media (min-width: $media-md) {
      padding: 24px;
    }

    strong {
      font-size: 12px;
      color: $color-gray;
      text-transform: uppercase;
      display: block;
    }
  }

  &__fact {
    flex: 1;
    flex-basis: 50%;
    margin-bottom: 16px;
  }

  &__locked {
    margin: 24px 0;
    font-weight: bold;

    p {
      margin-bottom: 24px;
    }
  }
}
</style>
