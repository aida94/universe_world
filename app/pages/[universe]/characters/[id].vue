<script setup lang="ts">
import type { Attribute } from '~/data/providers/provider'

const { providers } = useUniverseProvider()

const universeId = useTypedRoute<{ universe: string }>().params.universe
const characterId = useTypedRoute<{ id: string }>().params.id

const universe = computed(() => {
  return providers[universeId]
})

const { data: character, status, error } = await useAsyncData(
  `${universeId}-character-${characterId}`,
  async () => {
    if (!universe.value) {
      throw new Error(`Universe ${universeId} not undefined or null`)
    }
    return await universe.value.getCharacterById(characterId)
  },
  {
    immediate: true,
  },
)

function formatAttributeValue(value: Attribute): string {
  const toString = (item: unknown) => String(item)
  const replaceHyphens = (str: string) => str.replace(/-/g, ' ')

  if (Array.isArray(value)) {
    return value
      .map(toString)
      .map(replaceHyphens)
      .join(', ')
  }

  return replaceHyphens(toString(value))
}

function formatLabelKey(key: string): string {
  const replaceUnderscores = (str: string) => str.replace(/_/g, ' ')

  return `${replaceUnderscores(key)}:`
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

      <div v-if="status === 'pending'" class="text-center py-8">
        Loading character details...
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-600">
        Error loading character: {{ error.message }}
      </div>

      <div v-else-if="character" class="max-w-lg mx-auto">
        <UCard :title="character.name">
          <template #header>
            <div class="flex justify-center items-center">
              <UniverseImage
                :image="character.image"
                :alt="character.name"
                image-class="w-full h-60 object-contain rounded-xl"
                icon-class="size-48 text-neutral-600"
              />
            </div>
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
