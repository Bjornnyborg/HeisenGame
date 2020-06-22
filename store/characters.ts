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
}

export const actions = {
  INIT_GAME({ commit, state }: { commit: any; state: CharacterState }) {
    if (state.inGameCharacters.length) {
      return
    }

    const lockedCharacters = state.characters.filter((x) => {
      return !x.unlocked
    })

    const firstCharathers = lockedCharacters
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
