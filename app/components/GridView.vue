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
    <UCard :title="character.name" class="hover:shadow-xl hover:scale-102 border border-neutral-200 dark:border-neutral-400">
      <div class="flex flex-col h-full">
        <UButton
          variant="ghost"
          :label="character.name"
          class="cursor-pointer hover:bg-transparent hover:text-primary-500 font-semibold text-lg mx-auto capitalize"
        />

        <UniverseImage
          :image="character.image"
          :alt="character.name"
          image-class="w-full h-60 object-scale-down mb-4"
          icon-class="size-48 mx-auto text-neutral-600 dark:text-neutral-300"
        />
      </div>
    </UCard>
  </NuxtLink>
</template>
