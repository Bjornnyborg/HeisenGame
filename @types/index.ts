export interface HeisenState {
  showIntro: boolean
}

export interface CharacterState {
  characters: Character[]
  inGameCharacters: Character[]
}

export interface Character {
  appearance: number[]
  better_call_saul_appearance: number[]
  birthday: string
  category: string
  char_id: number
  img: string
  name: string
  nickname: string
  occupation: string[]
  portrayed: string
  status: string
  unlocked: boolean
}

export interface CardsState {
  flipped: Flip[]
  locked: boolean
}

export interface Flip {
  index: number
  id: number
}

export interface QuotesState {
  quotes: Quotes
  loading: boolean
}

export interface Quotes {
  [key: string]: string[]
}

export interface Quote {
  quote_id: number
  quote: string
  author: string
}
