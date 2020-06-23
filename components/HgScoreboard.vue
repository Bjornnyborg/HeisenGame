<template>
  <div class="scoreboard" :class="{ 'scoreboard--active': isShowScoreboard }">
    <div v-if="step == 0" class="scoreboard__step">
      <h1>Level {{ level }} in {{ step }} sec.</h1>
      <p>To get on the scoreboard, submit your name:</p>

      <form class="scoreboard__form">
        <input class="scoreboard__input" placeholder="Insert name" type="text" required />
        <button type="submit" class="btn">Submit</button>
      </form>

      <button type="button" @click="step = 1" class="scoreboard__continue">No thanks</button>
    </div>

    <div v-else class="scoreboard__step">
      <h1>Highscores for level {{ level }}</h1>

      <div class="scoreboard__score" v-for="(score, index) in scoreboard" :key="index">
        <div class="scoreboard__place">{{ index + 1}}</div>
        <div class="scoreboard__info">
          <div class="scoreboard__meta">
            <strong class="scoreboard__name">{{ score.name }}</strong>
            <div>{{ score.date }}</div>
          </div>
          <div>{{ score.time }}s</div>
        </div>
      </div>
      <div class="scoreboard__footer">
        <button @click="nextLevel" class="btn">Next level!</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data() {
    return {
      step: 0,
      scoreboard: [
        {
          name: 'Bjørn Nyborg',
          date: '23. June 2020 10:57',
          time: 80,
        },
        {
          name: 'Bjørn Nyborg Bjørn Nyborg Bjørn Nyborg Bjørn Nyborg',
          date: '23. June 2020 10:57',
          time: 90,
        },
        {
          name: 'Bjørn Nyborg',
          date: '23. June 2020 10:57',
          time: 100,
        },
      ],
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      isShowScoreboard: 'isShowScoreboard',
      level: 'characters/getLevel',
    }),
  },
  methods: {
    nextLevel() {
      this.step = 0
      this.$store.dispatch('characters/INIT_GAME')
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.scoreboard {
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

  &__step {
    padding: 16px;
    width: 100%;
  }

  &__input {
    padding: 6px 8px 6px 30px;
    border-radius: 30px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: none;
    flex-shrink: 1;
    max-width: 50%;
  }

  &__form {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

    > .btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &__score {
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 2px;
    background: $color-gray-dark;
    overflow: hidden;

    @media (min-width: $media-md) {
      padding: 8px 16px;
    }
  }

  &__footer {
    margin-top: 16px;
  }

  &__meta {
    text-align: left;
    font-size: 12px;
    color: $color-gray;
    overflow: hidden;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;
    overflow: hidden;
  }

  &__name {
    padding-right: 8px;
    font-size: 16px;
    flex-shrink: 1;
    color: $color-white;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    width: 100%;
    text-overflow: ellipsis;
  }

  &__place {
    width: 30px;
    height: 30px;
    background: $color-primary;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    font-weight: bold;
    flex-shrink: 0;

    @media (min-width: $media-md) {
      margin-right: 16px;
    }
  }

  &__continue {
    border: none;
    background: none;
    color: $color-white;
    border-bottom: 2px solid $color-white;
    cursor: pointer;
    transition: transform 0.3s;

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
  }
}
</style>
