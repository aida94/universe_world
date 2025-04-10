<script setup lang="ts">
const route = useRoute()
const { providers } = useUniverseProvider()

const universeId = route.params.universe

const universe = computed(() => {
  return providers[universeId]
})

const { data: characters } = await useAsyncData(
  `${universeId}-characters`,
  () => {
    return universe.value.getCharacters()
  },
)
</script>

<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2 text-xl">
        <h1>{{ universe?.displayName }} Characters</h1>
      </header>

      <div v-if="characters" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <UCard
          v-for="character in characters"
          :key="character.id"
          :title="character.name"
        >
          <template #header>
            <img
              :src="character.image"
              :alt="character.name"
              class="w-full h-48 object-cover"
            >
          </template>
        </UCard>
      </div>

      <div v-else class="text-center py-8">
        Loading characters...
      </div>
    </UContainer>
  </div>
</template>
