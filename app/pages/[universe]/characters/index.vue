<script setup lang="ts">
const route = useRoute()
const { providers } = useUniverseProvider()

const universeId = route.params.universe as string

const universe = computed(() => {
  return providers[universeId]
})

const { data: characters, pending } = await useAsyncData(
  `${universeId}-characters`,
  () => universe.value.getCharacters(),
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

      <div v-if="pending" class="text-center py-8">
        Loading characters...
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
          <UCard v-if="viewMode === 'grid'" :title="character.name">
            <div class="flex flex-col h-full">
              <h3 className="text-lg font-medium mb-4">
                {{ character.name }}
              </h3>

              <img
                :src="character.image"
                :alt="character.name"
                class="w-full h-50 object-scale-down mb-4"
              >
              <div class="flex justify-end">
                <NuxtLink :to="`/${universeId}/characters/${character.id}`">
                  <UButton class="cursor-pointer hover:scale-102">
                    View Details
                  </UButton>
                </NuxtLink>
              </div>
            </div>
          </UCard>

          <UCard v-else>
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <UAvatar :src="character.image" size="xl" />
                <h3 className="text-lg font-medium">
                  {{ character.name }}
                </h3>
              </div>
              <NuxtLink :to="`/${universeId}/characters/${character.id}`">
                <UButton class="cursor-pointer">
                  View Details
                </UButton>
              </NuxtLink>
            </div>
          </UCard>
        </div>
      </div>

      <div v-else class="text-center py-8">
        No characters found
      </div>
    </UContainer>
  </div>
</template>
