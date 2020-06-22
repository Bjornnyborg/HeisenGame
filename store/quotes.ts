import { QuotesState, Quote } from '~/@types'

export const state = (): QuotesState => ({
  quotes: {},
  loading: false,
})

export const mutations = {
  addQuote(state: QuotesState, quote: Quote[]) {
    if (!quote.length) {
      return
    }

    state.quotes[quote[0].author] = []

    quote.map((item) => {
      state.quotes[item.author].push(item.quote)
    })
  },
  setLoading(state: QuotesState, loading: boolean) {
    state.loading = loading
  },
}

export const getters = {
  getQuotes(state: QuotesState) {
    return state.quotes
  },
}

export const actions = {
  async GET_QUOTES(
    {
      commit,
      dispatch,
      state,
    }: {
      commit: any
      dispatch: any
      state: QuotesState
    },
    name: string
  ) {
    if (state.quotes[name]) {
      return
    }

    await fetch(
      'https://www.breakingbadapi.com/api/quote?author=' +
        name.split(' ').join('+')
    )
      .then((response) => response.json())
      .then((data) => {
        commit('addQuote', data)
      })
  },
}
