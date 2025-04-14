import type { Character } from '~/data/providers/provider'
import type { UniverseId } from '~/constants/universes'

export function useCharacterDetails(universeId: UniverseId, characterId: string) {
  const { providers } = useUniverseProvider()

  const universe = computed(() => providers[universeId])

  const { data: character, status, error } = useAsyncData<Character>(
    `${universeId}-character-${characterId}`,
    async () => {
      if (!universe.value) {
        throw new Error(`Universe ${universeId} not undefined or null`)
      }
      return await universe.value.getCharacterById(characterId)
    },
    { immediate: true },
  )

  return {
    character,
    status,
    error,
    universe,
  }
}
