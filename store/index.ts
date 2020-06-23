import { HeisenState } from '~/@types'

export const state = (): HeisenState => ({
  showIntro: true,
  showScoreboard: false,
  start: Date.now(),
  stop: 0,
})

export const mutations = {
  setShowIntro(state: HeisenState, showIntro: boolean) {
    state.showIntro = showIntro
  },
  setShowScoreboard(state: HeisenState, showScoreboard: boolean) {
    state.showScoreboard = showScoreboard
  },
  setStart(state: HeisenState, time: number) {
    state.start = time
  },
  setStop(state: HeisenState, time: number) {
    state.stop = time
  },
}

export const getters = {
  isShowIntro(state: HeisenState) {
    return state.showIntro
  },
  isShowScoreboard(state: HeisenState) {
    return state.showScoreboard
  },
  getStop(state: HeisenState) {
    return state.stop
  },
  getStart(state: HeisenState) {
    return state.start
  },
}

export const actions = {
  START({ commit }: { commit: any }, start: number) {
    commit('setStart', start)
  },
  STOP({ commit }: { commit: any }, stop: number) {
    commit('setStop', stop)
  },
}
