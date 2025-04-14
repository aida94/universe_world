export interface PokemonApiResponse {
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonApiResponseById {
  id: number
  name: string
  height: number
  weight: number
  abilities: {
    ability: {
      name: string
    }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
  held_items: {
    item: {
      name: string
    }
  }[]
}
