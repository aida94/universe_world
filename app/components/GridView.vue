<script setup lang="ts">
import type { Character } from '~/data/providers/provider'

interface Props {
  character: Character
  universeId: string
}

defineProps<Props>()
</script>

<template>
  <UCard :title="character.name">
    <div class="flex flex-col h-full">
      <h3 className="text-lg font-medium mb-4">
        {{ character.name }}
      </h3>

      <UniverseImage
        :image="character.image"
        :alt="character.name"
        image-class="w-full h-50 object-scale-down mb-4"
        icon-class="size-48 mx-auto text-neutral-600"
      />

      <div class="flex justify-end">
        <NuxtLink :to="`/${universeId}/characters/${character.id}`">
          <UButton class="cursor-pointer hover:scale-102">
            View Details
          </UButton>
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>
