import { CharacterState, Character } from '~/@types'
import { shuffle } from '~/helpers/shuffle'

export const state = (): CharacterState => ({
  characters: [],
  inGameCharacters: [],
})

export const mutations = {
  setCharacters(state: CharacterState, characters: Character[]) {
    state.characters = characters
  },
  setInGameCharacters(state: CharacterState, characters: Character[]) {
    state.inGameCharacters = characters
  },
}

export const getters = {
  getInGameCharacters(state: CharacterState) {
    return state.inGameCharacters
  },
}

export const actions = {
  INIT_GAME({ commit, state }: { commit: any; state: CharacterState }) {
    if (state.inGameCharacters.length) {
      return
    }

    const lockedCharaters = state.characters.filter((x) => {
      return !x.unlocked
    })

    const firstCharathers = lockedCharaters.slice(0, 8)

    const allCharaters = [...firstCharathers, ...firstCharathers]

    commit('setInGameCharacters', shuffle(allCharaters))
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
