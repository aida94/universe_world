<script setup lang="ts">
const route = useTypedRoute<{ universe: string, id: string }>()
const { character, status, error, universe } = useCharacterDetails(
  route.params.universe,
  route.params.id,
)
</script>

<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2 text-xl">
        <NuxtLink
          :to="`/${route.params.universe}/characters`"
          class="text-secondary-600 hover:text-secondary-800 flex items-center"
        >
          <UIcon name="i-lucide-chevron-left" class="mr-2" />
          Back to {{ universe?.displayName }} Characters
        </NuxtLink>
      </header>

      <div v-if="status === 'pending'" class="text-center py-8">
        Loading character details...
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-600">
        Error loading character: {{ error.message }}
      </div>

      <div v-else-if="character" class="max-w-lg mx-auto">
        <CharacterDetailCard :character="character" />
      </div>

      <div v-else class="text-center py-8">
        Character not found
      </div>
    </UContainer>
  </div>
</template>
