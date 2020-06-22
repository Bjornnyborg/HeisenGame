import { HeisenState } from '~/@types'

export const state = (): HeisenState => ({
  showIntro: true,
})

export const mutations = {
  setShowIntro(state: HeisenState, showIntro: boolean) {
    state.showIntro = showIntro
  },
}

export const getters = {
  isShowIntro(state: HeisenState) {
    return state.showIntro
  },
}
