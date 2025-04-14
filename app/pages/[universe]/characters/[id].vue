<script setup lang="ts">
import type { UniverseId } from '~/constants/universes'

const route = useTypedRoute<{ universe: string, id: string }>()
const { character, status, error, universe } = useCharacterDetails(
  route.params.universe as UniverseId,
  route.params.id,
)
</script>

<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2 text-xl">
        <NuxtLink
          :to="`/${route.params.universe}/characters`"
          class="text-secondary-500 hover:text-secondary-600 flex items-center dark:hover:text-secondary-400"
        >
          <UIcon name="i-lucide-chevron-left" class="mr-2" />
          Back to {{ universe?.displayName }} Characters
        </NuxtLink>
      </header>

      <div v-if="status === 'pending'" class="text-center py-8">
        Loading character details...
      </div>

      <div v-else-if="character" class="max-w-lg mx-auto">
        <CharacterDetailCard :character="character" />
      </div>

      <div v-else class="text-center py-8">
        <h2 class="text-2xl font-bold mb-4">Character Not Found</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6">
          The character you're looking for doesn't exist or has been removed.
        </p>
        <UButton
          :to="`/${route.params.universe}/characters`"
          icon="i-lucide-arrow-left"
          label="Return to Characters"
          variant="outline"
        />
      </div>
    </UContainer>
  </div>
</template>
