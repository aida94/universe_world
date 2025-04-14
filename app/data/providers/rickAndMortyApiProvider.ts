import type { Character, DataProvider } from './provider'
import type { RickAndMortyApiResponse, RickAndMortyCharacter } from '~/types/rickAndMorty'
import { UniverseId } from '~/constants/universes'

const RICK_AND_MORTY_PREVIEW_IMAGE = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'

export const RickAndMortyProvider: DataProvider = {
  id: UniverseId.RICK_AND_MORTY,
  displayName: 'Rick & Morty',
  image: RICK_AND_MORTY_PREVIEW_IMAGE,

  getCharacters: async (): Promise<Character[]> => {
    const data = await $rickAndMorty<RickAndMortyApiResponse>('/character')

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
    const character = await $rickAndMorty<RickAndMortyCharacter>(`/character/${id}`)

    return {
      id: character.id,
      name: character.name,
      image: character.image,
      attributes: {
        name: character.name,
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
