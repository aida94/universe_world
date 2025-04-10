interface RickAndMortyApiResponse {
  results: {
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
  }[]
}

type RickAndMortyCharacter = RickAndMortyApiResponse['results'][0]

export function useRickAndMortyApi() {
  const API_BASE_URL = 'https://rickandmortyapi.com/api'

  const fetchCharacters = async (): Promise<RickAndMortyApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/character`)
    if (!response.ok)
      throw new Error('Failed to fetch Rick & Morty characters')
    return response.json()
  }

  const fetchCharacterById = async (id: number): Promise<RickAndMortyCharacter> => {
    const response = await fetch(`${API_BASE_URL}/character/${id}`)
    if (!response.ok)
      throw new Error(`Failed to fetch Rick & Morty character ${id}`)
    return response.json()
  }

  return {
    fetchCharacters,
    fetchCharacterById,
  }
}
