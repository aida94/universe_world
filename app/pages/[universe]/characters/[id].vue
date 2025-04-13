<script setup lang="ts">
import type { Attribute } from '~/data/providers/provider'

const route = useRoute()
const { providers } = useUniverseProvider()

// Ensure these are being correctly extracted from the route
const universeId = route.params.universe as string
const characterId = route.params.id as string

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

function formatAttributeValue(value: Attribute): string {
  if (Array.isArray(value)) {
    return value.map(item =>
      typeof item === 'string' ? item.replace(/-/g, ' ') : String(item),
    ).join(', ')
  }
  if (typeof value === 'string') {
    return value.replace(/-/g, ' ')
  }
  return String(value)
}

function formatLabelKey(key: string): string {
  return `${key.replace(/_/g, ' ')}:`
}
</script>

<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2 text-xl">
        <NuxtLink :to="`/${universeId}/characters`" class="text-secondary-600 hover:text-secondary-800 flex items-center">
          <UIcon name="i-lucide-chevron-left" class="mr-2" /> Back to {{ universe?.displayName }} Characters
        </NuxtLink>
      </header>

      <div v-if="pending" class="text-center py-8">
        Loading character details...
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-600">
        Error loading character: {{ error.message }}
      </div>

      <div v-else-if="character" class="max-w-lg mx-auto">
        <UCard :title="character.name">
          <template #header>
            <template v-if="character.image.startsWith('http')">
              <img
                :src="character.image"
                :alt="character.name"
                class="w-full h-60 object-contain rounded-xl"
              >
            </template>
            <template v-else>
              <div class="flex justify-center items-center h-60">
                <UIcon
                  :name="character.image"
                  class="size-48 text-neutral-600"
                />
              </div>
            </template>
          </template>

          <div class="space-y-4">
            <div
              v-for="(value, key) in character.attributes"
              :key="key"
              class="flex gap-2 items-center"
            >
              <UButton
                :label="formatLabelKey(key)"
                color="primary"
                variant="ghost"
                class="!cursor-default hover:bg-transparent hover:text-primary-500 capitalize font-semibold"
              />

              <span>{{ formatAttributeValue(value) || "-" }}</span>
            </div>
          </div>
        </UCard>
      </div>

      <div v-else class="text-center py-8">
        Character not found
      </div>
    </UContainer>
  </div>
</template>
