<script setup lang="ts">
import type { UniverseId } from '~/constants/universes'

const route = useTypedRoute<{ universe: string }>()
const universeId = route.params.universe

const { characters, status, error, universe } = useCharacterList(universeId as UniverseId)

const storageKey = computed(() => `${universe.value?.displayName}-viewMode`)
const { viewMode } = useViewMode(storageKey.value)
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

      <CharacterList
        v-else-if="characters"
        :characters="characters"
        :view-mode="viewMode"
        :universe-id="universeId"
      />

      <div v-else class="text-center py-8">
        No characters found
      </div>
    </UContainer>
  </div>
</template>
