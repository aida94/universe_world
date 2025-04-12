import type { DataProvider } from '~/data/providers/provider'
import { LordOfTheRingsProvider } from '~/data/providers/lordOfTheRingsProvider'
import { PokemonProvider } from '~/data/providers/pokemonProvider'
import { RickAndMortyProvider } from '~/data/providers/rickAndMortyApiProvider'

export function useUniverseProvider() {
  const providers: Record<string, DataProvider> = {
    'rick-and-morty': RickAndMortyProvider,
    'pokemon': PokemonProvider,
    'lord-of-the-rings': LordOfTheRingsProvider,
  }

  return {
    providers,
  }
}
