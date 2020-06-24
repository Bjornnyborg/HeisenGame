import { CharacterState, Character } from '~/@types'
import { shuffle } from '~/helpers/shuffle'
import { DECKSIZE } from '~/constants'

export const state = (): CharacterState => ({
  characters: [],
  inGameCharacters: [],
  level: 0,
})

export const mutations = {
  setCharacters(state: CharacterState, characters: Character[]) {
    state.characters = characters
  },
  setInGameCharacters(state: CharacterState, characters: Character[]) {
    state.inGameCharacters = characters
  },
  levelUp(state: CharacterState) {
    state.level++
  },
  unlockCharacter(state: CharacterState, id: number) {
    const character = state.characters.find((x) => x.char_id == id)

    if (character) {
      character.unlocked = true
    }
  },
}

export const getters = {
  getInGameCharacters(state: CharacterState) {
    return state.inGameCharacters
  },
  getCharacters(state: CharacterState) {
    return state.characters
  },
  getUnlockedCharacters(state: CharacterState) {
    return state.characters.filter((x) => x.unlocked)
  },
  getLockedInGameCharacters(state: CharacterState) {
    return state.inGameCharacters.filter((x) => !x.unlocked)
  },
  getLevel(state: CharacterState) {
    return state.level
  },
}

export const actions = {
  LEVEL_DONE({ commit, dispatch }: { commit: any; dispatch: any }) {
    commit('setShowScoreboard', true, { root: true })
  },

  INIT_GAME({
    commit,
    dispatch,
    state,
  }: {
    commit: any
    dispatch: any
    state: CharacterState
  }) {
    commit('setShowScoreboard', false, { root: true })
    commit('levelUp')

    commit('setStart', Date.now, { root: true })
    commit('setStop', 0, { root: true })

    const lockedCharacters = state.characters.filter((x) => {
      return !x.unlocked
    })

    const firstCharathers = lockedCharacters.slice(0, DECKSIZE)
    const allCharacters = [...firstCharathers, ...firstCharathers]

    commit('setInGameCharacters', shuffle(allCharacters))
  },

  async GET_CHARACTHERS({
    commit,
    dispatch,
    state,
  }: {
    commit: any
    dispatch: any
    state: CharacterState
  }) {
    if (state.characters.length) {
      return
    }

    await fetch(
      'https://www.breakingbadapi.com/api/characters?category=Breaking+Bad'
    )
      .then((response) => response.json())
      .then((data) => {
        const characters = data.map((character: Character) => {
          return { ...character, unlocked: false }
        })

        commit('setCharacters', characters)

        dispatch('INIT_GAME')
      })
  },
}
