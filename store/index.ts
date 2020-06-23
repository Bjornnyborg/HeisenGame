import { HeisenState } from '~/@types'

export const state = (): HeisenState => ({
  showIntro: true,
  showScoreboard: false,
})

export const mutations = {
  setShowIntro(state: HeisenState, showIntro: boolean) {
    state.showIntro = showIntro
  },
  setShowScoreboard(state: HeisenState, showScoreboard: boolean) {
    state.showScoreboard = showScoreboard
  },
}

export const getters = {
  isShowIntro(state: HeisenState) {
    return state.showIntro
  },
  isShowScoreboard(state: HeisenState) {
    return state.showScoreboard
  },
}
