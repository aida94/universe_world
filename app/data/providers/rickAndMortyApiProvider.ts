import type { Character, DataProvider } from './provider'
import { useRickAndMortyApi } from '../api/rickAndMortyApi'

export const RickAndMortyProvider: DataProvider = {
  id: 'rick-and-morty',
  displayName: 'Rick & Morty',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',

  getCharacters: async (): Promise<Character[]> => {
    const { fetchCharacters } = useRickAndMortyApi()
    const data = await fetchCharacters()

    return data.results.map((character) => {
      return {
        id: character.id,
        name: character.name,
        image: character.image,
        attributes: {
          species: character.species,
          gender: character.gender,
          status: character.status,
          location: character.location.name,
          origin: character.origin.name,
          type: character.type,
        },
      }
    })
  },

  getCharacterById: async (id: string): Promise<Character> => {
    const { fetchCharacterById } = useRickAndMortyApi()
    const character = await fetchCharacterById(Number(id))

    return {
      id: character.id,
      name: character.name,
      image: character.image,
      attributes: {
        species: character.species,
        gender: character.gender,
        status: character.status,
        location: character.location.name,
        origin: character.origin.name,
        type: character.type,
      },
    }
  },
}
