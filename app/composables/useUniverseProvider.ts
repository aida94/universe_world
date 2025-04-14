import type { DataProvider } from '~/data/providers/provider'
import { UniverseId } from '~/constants/universes'
import { LordOfTheRingsProvider } from '~/data/providers/lordOfTheRingsProvider'
import { NatureProvider } from '~/data/providers/natureProvider'
import { PokemonProvider } from '~/data/providers/pokemonProvider'
import { RickAndMortyProvider } from '~/data/providers/rickAndMortyApiProvider'

export function useUniverseProvider() {
  const providers: Record<UniverseId, DataProvider> = {
    [UniverseId.RICK_AND_MORTY]: RickAndMortyProvider,
    [UniverseId.POKEMON]: PokemonProvider,
    [UniverseId.LORD_OF_THE_RINGS]: LordOfTheRingsProvider,
    [UniverseId.NATURE]: NatureProvider,
  }

  return {
    providers,
  }
}
