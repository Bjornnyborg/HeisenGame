export interface HeisenState {
  showIntro: boolean
  showScoreboard: boolean
  start: number
  stop: number
}

export interface CharacterState {
  characters: Character[]
  inGameCharacters: Character[]
  level: number
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
