<script setup lang="ts">
import type { Character } from '~/data/providers/provider'

interface Props {
  character: Character
  universeId: string
}

defineProps<Props>()
</script>

<template>
  <UCard>
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
</template>
