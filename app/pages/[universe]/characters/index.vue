<script setup lang="ts">
import type { Character } from '~/data/providers/provider'

const route = useTypedRoute<{ universe: string }>()
const { providers } = useUniverseProvider()

const universeId = route.params.universe

const universe = computed(() => {
  return providers[universeId]
})

const { data: characters, status, error } = await useAsyncData<Character[]>(
  `${universeId}-characters`,
  async () => {
    if (!universe.value) {
      throw new Error(`Universe ${universeId} not undefined or null`)
    }
    return await universe.value.getCharacters()
  },
  {
    immediate: true,
  },
)

const storageKey = computed(() => `${universe.value?.displayName}-viewMode`)

const viewMode = ref<'list' | 'grid'>('grid')

// Initialize from localStorage on client-side only
onMounted(() => {
  try {
    const savedMode = localStorage.getItem(storageKey.value) as 'list' | 'grid'
    if (savedMode) {
      viewMode.value = savedMode
    }
  }
  catch (e) {
    console.error('Failed to read from localStorage:', e)
  }
})

// Save to localStorage when viewMode changes
watch(viewMode, (newMode) => {
  try {
    localStorage.setItem(storageKey.value, newMode)
  }
  catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
})
</script>

<template>
  <div class="py-8">
    <UContainer>
      <header class="flex justify-between border-b mb-8 py-2 text-xl">
        <h1>{{ universe?.displayName }} Characters</h1>

        <DisplayMode v-model="viewMode" />
      </header>

      <div v-if="status === 'pending'" class="text-center py-8">
        Loading characters...
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-600">
        Error loading characters
      </div>

      <div
        v-else-if="characters" :class="[
          viewMode === 'grid'
            ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
            : 'space-y-4',
        ]"
      >
        <div
          v-for="character in characters"
          :key="character.id"
          class="block transition-transform"
        >
          <GridView
            v-if="viewMode === 'grid'"
            :character="character"
            :universe-id="universeId"
          />

          <ListView
            v-else
            :character="character"
            :universe-id="universeId"
          />
        </div>
      </div>

      <div v-else class="text-center py-8">
        No characters found
      </div>
    </UContainer>
  </div>
</template>
