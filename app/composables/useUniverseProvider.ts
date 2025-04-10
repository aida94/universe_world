import type { DataProvider } from '~/data/providers/provider'
import { PokemonProvider } from '~/data/providers/pokemonProvider'
import { RickAndMortyProvider } from '~/data/providers/rickAndMortyApiProvider'

export function useUniverseProvider() {
  const providers: Record<string, DataProvider> = {
    'rick-and-morty': RickAndMortyProvider,
    'pokemon': PokemonProvider,
  }

  return {
    providers,
  }
}
