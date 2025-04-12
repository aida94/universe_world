<script setup lang="ts">
const route = useRoute()
const { providers } = useUniverseProvider()

// Ensure these are being correctly extracted from the route
const universeId = route.params.universe as string
const characterId = route.params.id as string

console.log('Route params:', { universeId, characterId }) // Debug log

const universe = computed(() => {
  return providers[universeId]
})

// Add error handling and logging
const { data: character, pending, error } = await useAsyncData(
  `${universeId}-character-${characterId}`,
  async () => {
    try {
      return await universe.value.getCharacterById(characterId)
    }
    catch (e) {
      console.error('Error fetching character:', e)
      throw e
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2 text-xl">
        <NuxtLink :to="`/${universeId}/characters`" class="text-secondary-600 hover:text-secondary-800">
          ← Back to {{ universe?.displayName }} Characters
        </NuxtLink>
      </header>

      <div v-if="pending" class="text-center py-8">
        Loading character details...
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-600">
        Error loading character: {{ error.message }}
      </div>

      <div v-else-if="character" class="max-w-2xl mx-auto">
        <UCard :title="character.name">
          <template #header>
            <img
              :src="character.image"
              :alt="character.name"
              class="w-full h-64 object-cover"
            >
          </template>

          <div class="space-y-4">
            <ExampleCharacterDetail
              v-for="(value, key) in character.attributes"
              :key="key"
              :label="key"
            >
              {{ value }}
            </ExampleCharacterDetail>
          </div>
        </UCard>
      </div>

      <div v-else class="text-center py-8">
        Character not found
      </div>
    </UContainer>
  </div>
</template>
