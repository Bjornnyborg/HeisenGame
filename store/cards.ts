import { CardsState, Flip } from '~/@types'

export const state = (): CardsState => ({
  flipped: [],
  locked: false,
})

export const mutations = {
  resetFlipped(state: CardsState) {
    state.flipped = []
  },
  addFlip(state: CardsState, flip: Flip) {
    state.flipped.push(flip)
  },
  setLocked(state: CardsState, lock: boolean) {
    state.locked = lock
  },
}

export const getters = {
  getFlipped(state: CardsState) {
    return state.flipped.map((x) => x.index)
  },
  getLocked(state: CardsState) {
    return state.locked
  },
}

export const actions = {
  FLIP_CARD(
    {
      commit,
      state,
      dispatch,
    }: { commit: any; state: CardsState; dispatch: any },
    { index, id }: { index: number; id: number }
  ) {
    if (state.locked) {
      return
    }

    if (state.flipped.length === 2) {
      commit('resetFlipped')
    }

    commit('addFlip', { index, id })

    if (state.flipped.length) {
      console.log(id, state.flipped[0].id)
      if (index === state.flipped[0].index) {
        return
      } else if (id === state.flipped[0].id) {
        commit('addFlip', { index, id })
        commit('setLocked', true)
        setTimeout(() => {
          commit('characters/unlockCharacter', state.flipped[0].id, {
            root: true,
          })

          commit('setLocked', false)
          commit('resetFlipped')
        }, 1500)
      }
    }
  },
}
