<script setup lang="ts">
import type { Character } from '~/data/providers/provider'

interface Props {
  character: Character
}

defineProps<Props>()
</script>

<template>
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

    <CharacterAttributes :attributes="character.attributes" />
  </UCard>
</template>
