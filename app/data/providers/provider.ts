export type Attribute = string | number | string[] | undefined
export type Attributes = Record<string, Attribute>

export interface Character {
  id: number
  name: string
  image: string
  attributes: Attributes
}

export interface DataProvider {
  id: string
  displayName: string
  image: string
  getCharacters: () => Promise<Character[]>
  getCharacterById: (id: string) => Promise<Character>
}
