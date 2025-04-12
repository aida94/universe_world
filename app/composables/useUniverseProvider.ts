import type { DataProvider } from '~/data/providers/provider'
import { LordOfTheRingsProvider } from '~/data/providers/lordOfTheRingsProvider'
import { NatureProvider } from '~/data/providers/natureProvider'
import { PokemonProvider } from '~/data/providers/pokemonProvider'
import { RickAndMortyProvider } from '~/data/providers/rickAndMortyApiProvider'

export function useUniverseProvider() {
  const providers: Record<string, DataProvider> = {
    'rick-and-morty': RickAndMortyProvider,
    'pokemon': PokemonProvider,
    'lord-of-the-rings': LordOfTheRingsProvider,
    'nature': NatureProvider,
  }

  return {
    providers,
  }
}
