interface PokemonApiResponse {
  results: {
    name: string
    url: string
  }[]
}

interface PokemonApiResponseById {
  id: number
  name: string
  abilities: {
    ability: {
      name: string
    }
  }[]
}

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export function usePokemonApi() {
  const fetchCharacters = async (): Promise<PokemonApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/pokemon?offset=0&limit=50`)
    if (!response.ok)
      throw new Error('Failed to fetch Pokemon characters')
    return response.json()
  }

  const fetchCharacterById = async (
    id: number,
  ): Promise<PokemonApiResponseById> => {
    const response = await fetch(`${API_BASE_URL}/pokemon/${id}`)
    if (!response.ok)
      throw new Error(`Failed to fetch Pokemon character ${id}`)
    return response.json()
  }

  const buildImageUrlFromId = (id: number) => {
    return `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
  }

  return {
    fetchCharacters,
    fetchCharacterById,
    buildImageUrlFromId,
  }
}
