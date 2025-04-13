import type { Character } from '~/data/providers/provider'

export function useCharacterList(universeId: string) {
  const { providers } = useUniverseProvider()

  const universe = computed(() => providers[universeId])

  const { data: characters, status, error } = useAsyncData<Character[]>(
    `${universeId}-characters`,
    async () => {
      if (!universe.value) {
        throw new Error(`Universe ${universeId} not undefined or null`)
      }
      return await universe.value.getCharacters()
    },
    { immediate: true },
  )

  return {
    characters,
    status,
    error,
    universe,
  }
}
