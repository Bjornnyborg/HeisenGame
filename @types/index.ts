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
