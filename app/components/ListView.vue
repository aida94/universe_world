<script setup lang="ts">
import type { Character } from '~/data/providers/provider'

interface Props {
  character: Character
  universeId: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink :to="`/${universeId}/characters/${character.id}`">
    <UCard class="hover:shadow-xl hover:scale-101 border border-neutral-200 dark:border-neutral-400">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <template v-if="character.image.startsWith('http')">
            <UAvatar :src="character.image" size="xl" />
          </template>
          <template v-else>
            <div class="border p-2 rounded-full border-neutral-400 dark:border-neutral-200 size-10 flex items-center justify-center">
              <UIcon
                :name="character.image"
                class="size-6 text-neutral-600 dark:text-neutral-300"
              />
            </div>
          </template>

          <h3 className="text-lg font-medium">
            {{ character.name }}
          </h3>
        </div>

        <UButton class="cursor-pointer">
          View Details
        </UButton>
      </div>
    </UCard>
  </NuxtLink>
</template>
