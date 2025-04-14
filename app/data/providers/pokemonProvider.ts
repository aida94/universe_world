import type { Character, DataProvider } from './provider'
import type { PokemonApiResponse, PokemonApiResponseById } from '~/types/pokemon'
import { UniverseId } from '~/constants/universes'

const DEFAULT_LIMIT = 50
const POKEMON_PREVIEW_IMAGE = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'

function buildImageUrlFromId(id: number, baseUrl: string): string {
  return `${baseUrl}/${id}.svg`
}

export const PokemonProvider: DataProvider = {
  id: UniverseId.POKEMON,
  displayName: 'Pokemon',
  image: POKEMON_PREVIEW_IMAGE,

  async getCharacters(): Promise<Character[]> {
    const config = useRuntimeConfig()
    const data = await $pokemon<PokemonApiResponse>(`/pokemon?offset=0&limit=${DEFAULT_LIMIT}`)

    return data.results.map((character, index) => {
      return {
        id: index + 1,
        name: character.name,
        image: buildImageUrlFromId(index + 1, config.public.pokemonImageBaseUrl),
        attributes: {},
      }
    })
  },

  async getCharacterById(id: string): Promise<Character> {
    const config = useRuntimeConfig()
    const data = await $pokemon<PokemonApiResponseById>(`/pokemon/${id}`)

    return {
      id: data.id,
      name: data.name,
      image: buildImageUrlFromId(data.id, config.public.pokemonImageBaseUrl),
      attributes: {
        name: data.name,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map(ability => ability.ability.name),
        types: data.types.map(type => type.type.name),
        held_items: data.held_items.map(item => item.item.name),
      },
    }
  },
}
