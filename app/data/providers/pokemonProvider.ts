import type { Character, DataProvider } from './provider'
import { usePokemonApi } from '../api/pokemonApi'

export const PokemonProvider: DataProvider = {
  id: 'pokemon',
  displayName: 'Pokemon',
  image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',

  getCharacters: async (): Promise<Character[]> => {
    const { fetchCharacters, buildImageUrlFromId } = usePokemonApi()
    const data = await fetchCharacters()

    return data.results.map((character, index) => {
      return {
        id: index + 1,
        name: character.name,
        image: buildImageUrlFromId(index + 1),
        attributes: {},
      }
    })
  },
  getCharacterById: async (id: string): Promise<Character> => {
    const { fetchCharacterById, buildImageUrlFromId } = usePokemonApi()
    const data = await fetchCharacterById(Number(id))

    return {
      id: data.id,
      name: data.name,
      image: buildImageUrlFromId(data.id),
      attributes: {
        abilities: data.abilities.map(ability => ability.ability.name),
      },
    }
  },
}
