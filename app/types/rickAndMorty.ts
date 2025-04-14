export interface RickAndMortyCharacter {
  id: number
  name: string
  image: string
  species: string
  status: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  type: string
  url: string
  created: string
  episode: string[]
}

export interface RickAndMortyApiResponse {
  results: RickAndMortyCharacter[]
}
